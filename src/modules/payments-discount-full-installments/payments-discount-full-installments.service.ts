import { Injectable } from '@nestjs/common';
import { PaymentsDiscountFullInstallmentsRepository } from './payments-discount-full-installments.repository';
import { PaymentDiscountFullInstallmentsRequest } from './interfaces/request';
import { IncompleteRequestError } from '../../shared/utils/errors/types';
import { PaymentDiscountFullInstallmentsResponse } from './interfaces/response';

@Injectable()
export class PaymentsDiscountFullInstallmentsService {
    constructor(private readonly dataService: PaymentsDiscountFullInstallmentsRepository) { }

    async request(req: PaymentDiscountFullInstallmentsRequest){
        verifyCompleteRequest(req);
        const { studentId, period, career } = req;
        const data = await this.dataService.find(studentId, period, career);
        return mapPayments(data);
    }
}

const mapPayments = (data): PaymentDiscountFullInstallmentsResponse => {
    const mappedPayments = data.map(payment =>{
        return {
            studentId: payment.studentId,
            career: payment.career,
            item: payment.item,
            estate: payment.estate,
            amount: payment.amount
        }
    })
    return mappedPayments;
}

function verifyCompleteRequest(req: PaymentDiscountFullInstallmentsRequest){
    const {studentId, period, career } = req;

    if( studentId === '' || studentId === null || studentId === undefined){
        throw new IncompleteRequestError('Not a valid studentId');
    }
    if( period === '' || period === null || period === undefined){
        throw new IncompleteRequestError('Not a valid pariod');
    }
    if( career === '' || career === null || career === undefined){
        throw new IncompleteRequestError('Not a valid career');
    }
}
