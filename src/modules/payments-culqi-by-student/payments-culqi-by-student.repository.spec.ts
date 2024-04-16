import { Test, TestingModule } from "@nestjs/testing";
import { PaymentConst } from "../../utils/PaymentConst.service";
import { QaasApiService } from "../../infraestructure/Qaas/QaasApi.service";
import { PaymentsCulqiByStudentRepository } from "./payments-culqi-by-student.repository";


describe('PaymentsCulqiByStudentRepository Unit Tests', () => {
    let repository: PaymentsCulqiByStudentRepository;
    let qaasService: QaasApiService;
    let paymentConst: PaymentConst;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaymentsCulqiByStudentRepository,
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

        repository = module.get<PaymentsCulqiByStudentRepository>(PaymentsCulqiByStudentRepository);
        qaasService = module.get<QaasApiService>(QaasApiService);
        paymentConst = module.get<PaymentConst>(PaymentConst);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

})