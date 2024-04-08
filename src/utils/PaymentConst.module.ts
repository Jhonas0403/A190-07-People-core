import { Module } from "@nestjs/common";
import { PaymentConst } from "./PaymentConst.service";

@Module({
    providers:[PaymentConst],
    exports:[PaymentConst]
})

export class PaymentConstModule{}