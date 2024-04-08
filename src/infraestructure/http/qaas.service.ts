import { Injectable } from "@nestjs/common";
import logger from "src/shared/utils/logger";
const zipkinPlugin = require('zipkin-instrumentation-superagent');
const { Tracer } = require("zipkin");
const CLSContext = require('zipkin-context-cls');
const pack = require('../../../../package.json');
const recorder = { record: () => { } };
const AWSXRay = require('aws-xray-sdk');
import * as request from 'superagent';

@Injectable()
export class QaasAPI {
    request: any;
    config: any
    private tracer: any;
    constructor(config:any){
        this.request = request.agent();
        this.config = config;
    }
    init() {
        this.request.set('Accept', 'application/json');
        // Get ourselves a zipkin tracer
        this.tracer = new Tracer({
            ctxImpl: new CLSContext(),
            recorder: recorder,
            localServiceName: pack.name,
            defaultTags: { version: pack.version }, //stackoverflow.com/a/10855054/2823916
        });

    }

    queryPeopleSoftDatabase(query: string) {

        const database = 'peoplesoft';

        return async () => {
            const startime = Date.now();
            try {

                logger.info({
                    idTransaccion: this.tracer.id.traceId,
                    action: 'Request to qaas-service',
                    event: this.tracer.id.event,
                    urlService: this.tracer.id.urlService,
                    responseTime: 0,
                    status: 'OK',
                    code: 0,
                    message: { source: `POST ${this.config.qaasEndpoint}/${database}/query`, request: query },
                });


                const response = await this.request
                    .post(`${this.config.qaasEndpoint}/${database}/query`)
                    .use(zipkinPlugin({ tracer: this.tracer, remoteServiceName: 'qaas-service' }))  // Add zipkin superagent plugin
                    .timeout({
                        response: process.env.QAAS_TIMEOUT_RESPONSE,  // Wait 5 seconds for the server to start sending,
                        deadline: process.env.QAAS_TIMEOUT_DEADLINE, // but allow 30 seconds for the file to finish loading.
                    })
                    .send({ query })
                    .set('Content-Type', 'application/json')
                    .set('Authorization', this.config.qaasApiKey);

                logger.info({
                    idTransaccion: this.tracer.id.traceId,
                    action: 'Response from qaas-service',
                    event: this.tracer.id.event,
                    urlService: this.tracer.id.urlService,
                    responseTime: Date.now() - startime,
                    status: response.res.statusMessage,
                    code: response.statusCode,
                    message: { source: `POST ${this.config.qaasEndpoint}/${database}/query`, response: response.body },
                });

                AWSXRay.getSegment().addMetadata("Query", query);
                return response;

            } catch (e: any) {

                logger.error({
                    idTransaccion: this.tracer.id.traceId,
                    action: 'Response from qaas-service',
                    event: this.tracer.id.event,
                    urlService: this.tracer.id.urlService,
                    responseTime: Date.now() - startime,
                    status: e.status,
                    code: e.code || 'ET002',
                    message: { source: `POST ${this.config.qaasEndpoint}/${database}/query`, response: e.message },
                });

                // throw new ResourceUnavailableError(`Service error at '${this.config.qaasEndpoint}/${database}/query' with message: ${e.message}`);
            }
        };
    }
}