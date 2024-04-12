import { Controller, Injectable, Get, Query, HttpStatus } from '@nestjs/common';
import { PaymentsCulqiByStudentService } from './payments-culqi-by-student.service';
import { HttpResponse } from '../../infraestructure/entities/HttpResponse';
import { PaymentsCulqiByStudentRequest } from './interfaces/request';

@Injectable()
@Controller()
export class PaymentsCulqiByStudentController {
    constructor( private paymentCulqiByStudent: PaymentsCulqiByStudentService ){}

    @Get('payments-culqi')
    async PaymentsCulqiByStudent(
        @Query('studentId') studentId: string
    ){
        const request: PaymentsCulqiByStudentRequest = {
            studentId
        }
        const data = await this.paymentCulqiByStudent.request(request);

        const body = {
            status: 'Success',
            message: 'Payments found',
            data
        }
        const httpReesponse = new HttpResponse(body, HttpStatus.OK)
        return httpReesponse.body;
    }
}
