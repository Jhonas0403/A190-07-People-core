export class PaymentCons {
    BUSINESS_UNIT: string;
    STUDENT_ID: string;
    DUE_DATE: string;
    BILLING_DATE: string;
    AMOUNT_PAID: string;
    PENALTY: string;
    ITEM_NUMBER: string;
    PENALTY_PAID: string;
    CAREER: string;
    DESCRIPTION: string;
    AMOUNT: string;
    PAYMENT_TYPE: string;
    AMOUNT_NO_BENEFITS: string;
    PERIOD: string;
    DSCTO_PRONTO_PAGO: string;
    STATE: string;

    constructor() {
        this.BUSINESS_UNIT = 'BUSINESS_UNIT';
        this.STUDENT_ID = 'COMMON_ID';
        this.DUE_DATE = 'DUE_DT';
        this.BILLING_DATE = 'ACTUAL_BILLING_DT';
        this.AMOUNT_PAID = 'APPLIED_AMT';
        this.PENALTY = 'MORA_AMT';
        this.ITEM_NUMBER = 'ITEM_NBR';
        this.PENALTY_PAID = 'MORA_APPLIED_AMT';
        this.CAREER = 'ACAD_CAREER';
        this.DESCRIPTION = 'DESCR';
        this.AMOUNT = 'ITEM_AMT2';
        this.PAYMENT_TYPE = 'ACCOUNT_TYPE_SF';
        this.AMOUNT_NO_BENEFITS = 'ITEM_AMT';
        this.PERIOD = 'ACCOUNT_TERM';
        this.STATE = 'ESTADO';
        this.DSCTO_PRONTO_PAGO = 'DSCTO_PRONTO_PAGO';
    }

    processPayments(data: any[]): any[] {
        return data.map((payment: any) => {
            let dueDate: Date | null = payment[this.DUE_DATE] ? new Date(payment[this.DUE_DATE]) : null;

            let billingDate: any = new Date(payment[this.BILLING_DATE]);
            billingDate = billingDate.getTime() + 1000 * 60 * 60 * 5; // se le suma 5 horas
    
            let amountPaid = payment[this.AMOUNT_PAID];
            if (amountPaid === null) {
              amountPaid = 0;
            } else {
              amountPaid = parseFloat(parseFloat(amountPaid).toFixed(2));
            }
            let paymentPenalty = payment[this.PENALTY];
            if (paymentPenalty === null) {
              paymentPenalty = 0;
            } else {
              paymentPenalty = parseFloat(parseFloat(paymentPenalty).toFixed(2));
            }
            let amount = payment[this.AMOUNT];
            if (amount === null) {
              amount = 0;
            } else {
              amount = parseFloat(parseFloat(amount).toFixed(2));
            }
            let paymentPenaltyPaid = payment[this.PENALTY_PAID];
            if (paymentPenaltyPaid === null) {
              paymentPenaltyPaid = 0;
            } else {
              paymentPenaltyPaid = parseFloat(parseFloat(paymentPenaltyPaid).toFixed(2));
            }
    
            let amountWithoutBenefits = payment[this.AMOUNT_NO_BENEFITS];
            if (amountWithoutBenefits === null) {
              amountWithoutBenefits = 0;
            } else {
              amountWithoutBenefits = parseFloat(parseFloat(amountWithoutBenefits).toFixed(2));
            }
    
            function calculateAmountToShow(initial: number, paid: number) {
              const totalDiff = (Math.round(initial * 100) - Math.round(paid * 100)) / 100;
              if (totalDiff === 0) {
                return initial;
              }
              return totalDiff;
            }
    
            return {
              studentId: payment[this.STUDENT_ID],
              businessUnit: payment[this.BUSINESS_UNIT],
              career: payment[this.CAREER],
              itemNbr: payment[this.ITEM_NUMBER],
              description: payment[this.DESCRIPTION],
              amount: amountWithoutBenefits,
              amountPaid,
              dueDate: dueDate ? dueDate.getTime() + 1000 * 60 * 60 * 5 : null,
              billingDate,
              paymentPenalty,
              paymentPenaltyPaid,
              discountProntoPago: Math.round((payment[this.DSCTO_PRONTO_PAGO] || 0) * 100) / 100,
              paymentType: payment[this.PAYMENT_TYPE],
              amountWithoutBenefits,
              period: payment[this.PERIOD],
            };
        });
      }

    convertResultSPToObject(data: any) {
        return data[0].map((RowDataPacket: any) => {
          return {
            BUSINESS_UNIT: RowDataPacket.BUSINESS_UNIT,
            COMMON_ID: RowDataPacket.COMMON_ID,
            DUE_DT: RowDataPacket.DUE_DT,
            ACTUAL_BILLING_DT: RowDataPacket.ACTUAL_BILLING_DT,
            APPLIED_AMT: RowDataPacket.APPLIED_AMT,
            MORA_AMT: RowDataPacket.MORA_AMT,
            ITEM_NBR: RowDataPacket.ITEM_NBR,
            MORA_APPLIED_AMT: RowDataPacket.MORA_APPLIED_AMT,
            ACAD_CAREER: RowDataPacket.ACAD_CAREER,
            DESCR: RowDataPacket.DESCR,
            ITEM_AMT2: RowDataPacket.ITEM_AMT2,
            ACCOUNT_TYPE_SF: RowDataPacket.ACCOUNT_TYPE_SF,
            ACCOUNT_TERM: RowDataPacket.ACCOUNT_TERM,
            ITEM_AMT: RowDataPacket.ITEM_AMT,
          };
        });
      }
}

