import { Injectable } from "@nestjs/common";
import { QaasApiService } from "../../infraestructure/Qaas/QaasApi.service";
import { PaymentConst } from "../../utils/PaymentConst.service";

@Injectable()
export class PaymentsDiscountFullInstallmentsRepository {
    httpGateway: QaasApiService;
    paymentCons: PaymentConst;

    constructor(
        payC: PaymentConst,
        http: QaasApiService
    ){
        this.paymentCons = payC;
        this.httpGateway = http;
    }

    async find(studentId: string, period: string, career: string){
        const query = buildQuery(studentId, period, career);
        
        const result = await this.httpGateway.queryPeopleSoftDatabase(query);
        // const result = await fnToExecute();
        const data = result.body.data.result === null ? null : result.body.data.result.rows;

        if (data[0] != null) {
            const payments = this.paymentCons.processPayments(data);

            return payments;
        }

        return [];
    }
}

const buildQuery = (studentId: string, period: string, career: string) =>
    `SELECT EMPLID, ACAD_CAREER ,ACCOUNT_TERM ,ITEM_TYPE ,ESTADO ,ITEM_AMT FROM SYSADM.ps_utp_ben_con_tbl where business_unit = 'UNUTP' and EMPLID = '${studentId}' and acad_career = '${career}' and account_term = '${period}' AND ESTADO = 'ACTV'`;