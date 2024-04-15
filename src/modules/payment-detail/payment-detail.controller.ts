import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { PaymentDetailService } from './payment-detail.service';
import { HttpResponse } from 'src/infraestructure/entities/HttpResponse';
import { PaymentDetailReportRequest } from './interfaces/request';

@Controller('payments')
export class PaymentDetailController {
    constructor(private paymentDetailService: PaymentDetailService) { }

    @Get('details')
    async getPaymentDetail(
        @Query('studentId') studentId: string,
        @Query('itemNbr') itemNbr: string,
    ): Promise<HttpResponse> {
        const request: PaymentDetailReportRequest = {
            studentId,
            itemNbr
        };
        const data = await this.paymentDetailService.request(request);
        const body = {
            status: 'Success',
            message: 'Payments found',
            data
        }
        const httpReesponse = new HttpResponse(body, HttpStatus.OK)
        return httpReesponse.body;

    }
}
