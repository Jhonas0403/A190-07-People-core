import { Injectable } from "@nestjs/common";
import { QaasApiService } from "../../infraestructure/Qaas/QaasApi.service";
import { PaymentConst } from "../../utils/PaymentConst.service";

@Injectable()
export class PaymentsCulqiByStudentRepository {
    httpGateway: QaasApiService;
    paymentCons: PaymentConst;

    constructor(
        payC: PaymentConst,
        http: QaasApiService
    ){
        this.paymentCons = payC;
        this.httpGateway = http;
    }

    async find( studentId: string ){
        const query = buildQuery(studentId, 'UNUTP');
        const fnToExecute = this.httpGateway.queryPeopleSoftDatabase(query);
        const result = await fnToExecute();
        const data = result.body.data.result === null ? null : result.body.data.result.rows;
        
        if (data[0] != null) {
            const payments = this.paymentCons.processPayments(data);

            return payments;
        }

        return [];
    }
}

const buildQuery = (studentId: string, businessUnit: string) =>
    `SELECT BUSINESS_UNIT, COMMON_ID, DUE_DT, ACTUAL_BILLING_DT, APPLIED_AMT, MORA_AMT, ITEM_NBR, MORA_APPLIED_AMT, ACAD_CAREER, DESCR, ACCOUNT_TYPE_SF, ITEM_AMT, ACCOUNT_TERM, DSCTO_PRONTO_PAGO FROM SYSADM.PS_FLASH_PG_CUL_VW WHERE COMMON_ID='${studentId}' AND BUSINESS_UNIT='${businessUnit}'`;