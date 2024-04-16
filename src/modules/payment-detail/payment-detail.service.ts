import { Injectable } from '@nestjs/common';
import { PaymentDetailRepository } from './payment-detail.repository';
import { PaymentDetailReportRequest } from './interfaces/request';
import { DataNotFoundException, IncompleteRequestError } from '../../shared/utils/errors/types';

@Injectable()
export class PaymentDetailService {
    constructor(private readonly paymentDetailRepository: PaymentDetailRepository) { }

    async request(req: PaymentDetailReportRequest){
        verifyCompleteRequest(req);
        const {studentId, itemNbr} = req;
        const data = await this.paymentDetailRepository.find(studentId, itemNbr);
        verifyIfDataHaveBeenFound(data);
        
        return data;
    }
}

function verifyCompleteRequest(req: PaymentDetailReportRequest) {
    if (req.studentId == null || req.studentId === '' || req.studentId === 'undefined') {
        throw new IncompleteRequestError('Not a valid Student Id');
    }
    if (req.itemNbr == null || req.itemNbr === '' || req.itemNbr === 'undefined') {
        throw new IncompleteRequestError('Not a valid Item Number');
    }
}

function verifyIfDataHaveBeenFound(data) {
    if (data.length > 0) {
        if (
            data[0].amount == null &&
            data[0].amountPaid == null &&
            data[0].amountWithoutBenefits == null &&
            data[0].billingDate == null &&
            data[0].businessUnit == null &&
            data[0].career == null &&
            data[0].description == null &&
            data[0].dueDate == null &&
            data[0].itemNbr == null &&
            data[0].discountProntoPago == null && 
            data[0].paymentPenalty == null &&
            data[0].paymentPenaltyPaid == null &&
            data[0].paymentType == null &&
            data[0].period == null &&
            data[0].studentId == null
        ) {
          throw new DataNotFoundException('Data not found');
        }
    } else {
        throw new DataNotFoundException('Data not found');
    }
  }
