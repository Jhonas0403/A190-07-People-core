import { Injectable } from "@nestjs/common";
import { PaymentsByStudentRequest } from "../payments-by-student/interfaces/request";
import { PaymentsByStudentRepository } from "./payments-by-student.repository";
import { PaymentsByStudentResponse } from "./interfaces/response";
import { IncompleteRequestError, DataNotFoundException } from "../../shared/utils/errors/types";

@Injectable()
export class PaymentsByStudentService{
    constructor(private readonly dataService: PaymentsByStudentRepository) { }

    async request (req:PaymentsByStudentRequest){
        verifyCompleteRequest(req);
        const {period, studentId} = req;
        const data = await this.dataService.find(studentId,period);
        verifyIfDataHaveBeenFound(data);
    
        return mapPayments(data);
    }
}

const mapPayments = (data): PaymentsByStudentResponse => {
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
      };
    });
    const result: PaymentsByStudentResponse = {
      studentId,
      businessUnit,
      career,
      payments: mappedPayments,
    };
    return result;
  };

  function verifyCompleteRequest(req: PaymentsByStudentRequest) {
    if (req.studentId == null || req.studentId === '') {
      throw new IncompleteRequestError('Not a valid Student Id');
    }
    if (req.period == null || req.period === '') {
      throw new IncompleteRequestError('Not a valid Period Id');
    }
  }
  
  function verifyIfDataHaveBeenFound(data): void {  
    if (data.length === 0 || isAllPropertiesNull(data[0])) {
      throw new DataNotFoundException('Data not found');
    }
  }
  
  function isAllPropertiesNull(obj: Record<string, any>): boolean {
    return Object.values(obj).every((value) => value === null);
  }