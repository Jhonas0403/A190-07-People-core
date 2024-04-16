import { Test, TestingModule } from "@nestjs/testing";
import { QaasApiService } from "../../infraestructure/Qaas/QaasApi.service";
import { PaymentConst } from "../../utils/PaymentConst.service";
import { PaymentsByStudentRepository } from "./payments-by-student.repository";

describe('PaymentsByStudentRepository Unit Tests', () => {
    let repository: PaymentsByStudentRepository;
    let qaasService: QaasApiService;
    let paymentConst: PaymentConst;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaymentsByStudentRepository,
                {
                    provide: QaasApiService,
                    useValue: {
                        queryPeopleSoftDatabase: jest.fn(() => [])
                    }
                },
                {
                    provide: PaymentConst,
                    useValue: {
                        processPayments: jest.fn(() => [])
                    }
                }
            ],
        }).compile();

        repository = module.get<PaymentsByStudentRepository>(PaymentsByStudentRepository);
        qaasService = module.get<QaasApiService>(QaasApiService);
        paymentConst = module.get<PaymentConst>(PaymentConst);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

})