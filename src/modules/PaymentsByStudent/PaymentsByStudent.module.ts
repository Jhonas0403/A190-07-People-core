import { Module } from "@nestjs/common";
import { QaasApiModule } from "src/infraestructure/Qaas/QaasApi.module";
import { PaymentsByStudentRepository } from "./PaymentsByStudent.repository";
import { PaymentsByStudentService } from "./PaymentsByStudent.service";
import { PaymentsByStudentController } from "./PaymentsByStudent.controller";
import { PaymentConstModule } from "src/utils/PaymentConst.module";
@Module({
    controllers:[PaymentsByStudentController],
    providers:[PaymentsByStudentRepository,PaymentsByStudentService]
})

export class PaymentsByStudentModule{}