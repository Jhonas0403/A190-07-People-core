import { Test, TestingModule } from "@nestjs/testing";
import { QaasApiService } from "../../infraestructure/Qaas/QaasApi.service";
import { PaymentsDiscountFullInstallmentsRepository } from "./payments-discount-full-installments.repository";
import { PaymentConst } from "../../utils/PaymentConst.service";

describe('PaymentsDiscountFullInstallmentsRepository Unit Tests', () => {
    let paymentsDiscountFullInstallmentsRepository: PaymentsDiscountFullInstallmentsRepository;
    let qaasService: QaasApiService;
    let paymentConst: PaymentConst;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaymentsDiscountFullInstallmentsRepository,
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

        paymentsDiscountFullInstallmentsRepository = module.get<PaymentsDiscountFullInstallmentsRepository>(PaymentsDiscountFullInstallmentsRepository);
        qaasService = module.get<QaasApiService>(QaasApiService);
        paymentConst = module.get<PaymentConst>(PaymentConst);
    });

    it('should be defined', () => {
        expect(paymentsDiscountFullInstallmentsRepository).toBeDefined();
    });
});