import { Injectable } from "@nestjs/common";
import { QaasApiService } from "../../infraestructure/Qaas/QaasApi.service";
import { PaymentConst } from "../../utils/PaymentConst.service";

@Injectable()
export class PaymentDetailRepository {
    paymentConst: PaymentConst;
    httpGateway: QaasApiService;

    constructor(
        paymentConst: PaymentConst,
        httpGateway: QaasApiService
    ) {
        this.paymentConst = paymentConst;
        this.httpGateway = httpGateway;
    }

    async find(studentId: string, itemNbr: string) {
        const query = buildQuery(studentId, itemNbr);
        const result = await this.httpGateway.queryPeopleSoftDatabase(query);
        const data = result.body.data.result === null ? null : result.body.data.result.rows;
        
        if (data[0] != null) {
            const payments = this.paymentConst.processPayments(data);
            return payments;
        } else {
            return []

        }
    }
}

const buildQuery = (studentId: string, itemNbr: string) =>
    `SELECT BUSINESS_UNIT, COMMON_ID, DUE_DT, ACTUAL_BILLING_DT, APPLIED_AMT, MORA_AMT, ITEM_NBR, MORA_APPLIED_AMT, ACAD_CAREER, DESCR, ITEM_AMT2, ACCOUNT_TYPE_SF, ACCOUNT_TERM, ITEM_AMT FROM SYSADM.PS_FLASH_PG_ALU_VW WHERE COMMON_ID='${studentId}' AND ITEM_NBR='${itemNbr}'`;