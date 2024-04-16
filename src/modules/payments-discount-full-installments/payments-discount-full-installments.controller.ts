import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { PaymentsDiscountFullInstallmentsService } from './payments-discount-full-installments.service';
import { PaymentDiscountFullInstallmentsRequest } from './interfaces/request';
import { HttpResponse } from '../../infraestructure/entities/HttpResponse';

@Controller('payments')
export class PaymentsDiscountFullInstallmentsController {
    constructor(private readonly paymentsDiscountFullInstallmentsService: PaymentsDiscountFullInstallmentsService) { }

    @Get('discount-full-installments')
    async getDiscountFullInstallments(
        @Query('studentId') studentId: string,
        @Query('period') period: string,
        @Query('career') career: string
    ) {
        const request: PaymentDiscountFullInstallmentsRequest = {
            studentId,
            period,
            career
        }
        const data = await this.paymentsDiscountFullInstallmentsService.request(request);

        const body = {
            status: 'Success',
            message: 'Discount Full Installments',
            data
        }
        const httpReesponse = new HttpResponse(body, HttpStatus.OK)
        return httpReesponse.body;
    }

}
