import { Controller, Get, HttpStatus, Query, Req } from "@nestjs/common";
import { PaymentsByStudentService } from "./PaymentsByStudent.service";
import { HttpResponse } from '../../infraestructure/entities/HttpResponse';
import { HttpRequest } from "src/infraestructure/entities/HttpRequest";
import { PaymentsByStudentRequest } from "./dto/request";
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