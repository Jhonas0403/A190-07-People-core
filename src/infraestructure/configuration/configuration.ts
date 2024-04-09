import { Injectable } from "@nestjs/common";
import dotenv from 'dotenv';
import { ConfigurationInterface } from "../interfaces/Configuration";
@Injectable()
export class Configuration implements ConfigurationInterface {
    constructor() { }
    getCoreApiHttpConfig() {
        return {
            qaasEndpoint: process.env.QAAS_ENDPOINT,
            qaasApiKey: process.env.QAAS_APIKEY,
        };
    }
}