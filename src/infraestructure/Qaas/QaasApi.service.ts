// import { Injectable } from "@nestjs/common";
import *as request from "superagent";
import { Injectable } from '@nestjs/common';
import { Configuration } from "src/configuration/configuration";
@Injectable()
export class QaasApiService {
    request: any;
    config: any;
    constructor(private readonly configuration:Configuration){
        this.request = request.agent();
        this.config = configuration.getCoreApiHttpConfig();
    }
  init(){
    this.request.set('Accept', 'application/json');
  }
  queryPeopleSoftDatabase(query: string) {
    const database = 'peoplesoft';
    return async () => {
        const response =  await this.request
        .post(`${this.config.qaasEndpoint}/${database}/query`)
        .send({query})
        .set('Content-Type', 'application/json')
        .set('Authorization', this.config.qaasApiKey);

        return response
    }
  }
}
