import { Controller, Get, HttpStatus, Query, Req } from "@nestjs/common";
import { HttpResponse } from '../../infraestructure/entities/HttpResponse';
import { PaymentsByStudentRequest } from "../payments-by-student/interfaces/request";
import { PaymentsByStudentService } from "./payments-by-student.service";
@Controller()

export class PaymentsByStudentController {
    constructor(private paymentByStudentService: PaymentsByStudentService) { }

    @Get('payments')
    async getPaymentsByStudent(
        @Query('studentId') studentId: string,
        @Query('period') period: string,
    ): Promise<HttpResponse> {
        const request: PaymentsByStudentRequest = {
            period,
            studentId
        };
        const data = await this.paymentByStudentService.request(request);
        const body = {
            status: 'Success',
            message: 'Payments found',
            data
        }
        const httpReesponse = new HttpResponse(body, HttpStatus.OK)
        return httpReesponse.body;

    }
}