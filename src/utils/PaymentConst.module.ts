import { Global, Module } from "@nestjs/common";
import { PaymentConst } from "./PaymentConst.service";

@Global()
@Module({
    providers:[PaymentConst],
    exports:[PaymentConst]
})

export class PaymentConstModule{}