import { Global, Module } from "@nestjs/common";
import { QaasApiService } from "./QaasApi.service";
import { ConfigurationModule } from "../configuration/configuration.module";
@Global()
@Module({
    imports:[ConfigurationModule],
    exports:[QaasApiService],
    providers:[QaasApiService],
})

export class QaasApiModule{}