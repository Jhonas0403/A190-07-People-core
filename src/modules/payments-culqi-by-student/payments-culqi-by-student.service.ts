import { Injectable } from '@nestjs/common';
import { PaymentsCulqiByStudentRepository } from './payments-culqi-by-student.repository';
import { PaymentsCulqiByStudentRequest } from './interfaces/request';
import { IncompleteRequestError, DataNotFoundException } from '../../shared/utils/errors/types';
import { PaymentsCulqiByStudentReportResponse } from './interfaces/response';

@Injectable()
export class PaymentsCulqiByStudentService {
    constructor(private readonly dataService: PaymentsCulqiByStudentRepository) { }

    async request(req: PaymentsCulqiByStudentRequest){
        verifyCompleteRequest(req);
        const { studentId } = req;
        const data = await this.dataService.find(studentId);
        verifyIfDataHaveBeenFound(data);
        
        return mapPayments(data);
    }
}

const mapPayments = (data): PaymentsCulqiByStudentReportResponse => {
    const studentId = data[0].studentId!;
    const businessUnit = data[0].businessUnit!;
    const career = data[0].career!;
    const mappedPayments = data.map((payment) => {
      return {
        itemNbr: payment.itemNbr!,
        description: payment.description!,
        amount: payment.amount!,
        amountPaid: payment.amountPaid!,
        dueDate: payment.dueDate!,
        billingDate: payment.billingDate!,
        paymentPenalty: payment.paymentPenalty!,
        paymentPenaltyPaid: payment.paymentPenaltyPaid!,
        paymentType: payment.paymentType!,
        amountWithoutBenefits: payment.amountWithoutBenefits!,
        periodCode: payment.period!,
        discountProntoPago: payment.discountProntoPago!,
      };
    });
    const result: PaymentsCulqiByStudentReportResponse = {
      studentId,
      businessUnit,
      career,
      payments: mappedPayments,
    };
    return result;
  };

function verifyCompleteRequest(req: PaymentsCulqiByStudentRequest){
    const { studentId } = req;
    if( studentId === '' || studentId === null ){
        throw new IncompleteRequestError('Not a valid studentId');
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
        data[0].paymentDetail == null &&
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
