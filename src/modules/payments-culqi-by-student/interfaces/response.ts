export interface PaymentsCulqiByStudentReportResponse {
    businessUnit: string;
    studentId: string;
    career: string;
    payments: Payment[];
}
  
interface Payment {
    itemNbr: string;
    description: string;
    amountWithoutBenefits: number;
    amount: number;
    amountPaid: number;
    dueDate: number;
    billingDate: number;
    paymentPenalty: number;
    paymentPenaltyPaid: number;
    paymentType: string;
    periodCode: string;
    discountProntoPago: number;
}