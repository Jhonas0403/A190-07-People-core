import { Test } from "@nestjs/testing";
import { QaasApiService } from "../../infraestructure/Qaas/QaasApi.service";
import { PaymentConst } from "../../utils/PaymentConst.service";
import { PaymentDetailRepository } from "./payment-detail.repository";

describe('PaymentDetailRepository Unit Test', () => {
    let respository: PaymentDetailRepository;
    let qaasService: QaasApiService;
    let paymentConst: PaymentConst;

    beforeEach(async() => {
        const module = await Test.createTestingModule({
            providers: [
                PaymentDetailRepository,
                {
                    provide: QaasApiService,
                    useValue: {
                        queryPeopleSoftDatabase: jest.fn(()=>[])
                    }
                },
                {
                    provide: PaymentConst,
                    useValue: {
                        processPayments: jest.fn(()=>[])
                    }
                }
            ]
        }).compile();

        respository = module.get<PaymentDetailRepository>(PaymentDetailRepository);
        qaasService = module.get<QaasApiService>(QaasApiService);
        paymentConst = module.get<PaymentConst>(PaymentConst);
    })

    it('should be defined', () => {
        expect(respository).toBeDefined();
    })
})