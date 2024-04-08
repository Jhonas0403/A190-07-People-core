import { Global, Module } from "@nestjs/common";
import { QaasAPI } from "./qaas.service";
import { PaymentCons } from "src/modules/controllers/PaymentsByStudent/cons/PaymentConst";

@Global()
@Module({
    exports:[QaasAPI, PaymentCons],
    providers:[QaasAPI, PaymentCons]
})
export class HttpModule {}