import { Global, Module } from "@nestjs/common";
import { QaasApiService } from "./QaasApi.service";
import { ConfigurationModule } from "src/configuration/configuration.module";
@Global()
@Module({
    imports:[ConfigurationModule],
    exports:[QaasApiService],
    providers:[QaasApiService],
})

export class QaasApiModule{}