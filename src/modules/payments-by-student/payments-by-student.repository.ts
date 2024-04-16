import { Injectable } from "@nestjs/common";
import { PaymentConst } from "../../utils/PaymentConst.service";
import { QaasApiService } from "../../infraestructure/Qaas/QaasApi.service";

@Injectable()
export class PaymentsByStudentRepository {
    paymentCons:PaymentConst;
    httpGateway: QaasApiService;

    constructor(
        payC:PaymentConst,
        http: QaasApiService
    ) {
        this.paymentCons = payC;
        this.httpGateway = http;
    }
    async find(
        studentId: string,
        period: string
    ){
        const query = buildQuery(studentId, period, 'UNUTP', 'PREG');
        const result = await this.httpGateway.queryPeopleSoftDatabase(query);
        const data = result.body.data.result.rows;

        if (!data[0]) return [];
        return this.paymentCons.processPayments(data)

    }

}
const buildQuery = (studentId: string, period: string, businessUnit: string, career: string) => `SELECT BUSINESS_UNIT, COMMON_ID, DUE_DT, ACTUAL_BILLING_DT, APPLIED_AMT, MORA_AMT, ITEM_NBR, MORA_APPLIED_AMT, ACAD_CAREER, DESCR, ACCOUNT_TYPE_SF, 0 ITEM_AMT2, ITEM_AMT, ACCOUNT_TERM, DSCTO_PRONTO_PAGO FROM SYSADM.PS_FLASH_PG_CUL_VW WHERE COMMON_ID = '${studentId}' AND BUSINESS_UNIT = 'UNUTP' union SELECT BUSINESS_UNIT, COMMON_ID, DUE_DT, ACTUAL_BILLING_DT, APPLIED_AMT, MORA_AMT, ITEM_NBR, MORA_APPLIED_AMT, ACAD_CAREER, DESCR, ACCOUNT_TYPE_SF, ITEM_AMT2, ITEM_AMT, ACCOUNT_TERM, 0 DSCTO_PRONTO_PAGO FROM SYSADM.PS_FLASH_PG_ALU_VW WHERE COMMON_ID = '${studentId}' AND BUSINESS_UNIT ='UNUTP' AND ACCOUNT_TERM >= '${period}' AND (ITEM_AMT - APPLIED_AMT) = 0`;