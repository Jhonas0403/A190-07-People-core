import { Injectable } from "@nestjs/common";
import dotenv from 'dotenv';
@Injectable()
export class Configuration {
    constructor() {}
    getCoreApiHttpConfig() {
        return {
            qaasEndpoint: process.env.QAAS_ENDPOINT,
            qaasApiKey: process.env.QAAS_APIKEY,
        };
    }
}