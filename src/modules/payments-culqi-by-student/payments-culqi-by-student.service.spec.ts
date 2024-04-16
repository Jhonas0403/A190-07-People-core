import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsCulqiByStudentService } from './payments-culqi-by-student.service';
import { PaymentsCulqiByStudentRepository } from './payments-culqi-by-student.repository';
import { PaymentsCulqiByStudentRequest } from './interfaces/request';
import { IncompleteRequestError } from '../../shared/utils/errors/types';

describe('PaymentsCulqiByStudentService Unit Tests', () => {
  let paymentsCulqiByStudentService: PaymentsCulqiByStudentService;
  let paymentsCulqiByStudentRepository: PaymentsCulqiByStudentRepository;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsCulqiByStudentService,
        {
          provide: PaymentsCulqiByStudentRepository,
          useValue: {
            find: jest.fn(() => [])
          }
        }
      ],
    }).compile();

    paymentsCulqiByStudentService = module.get<PaymentsCulqiByStudentService>(PaymentsCulqiByStudentService);
    paymentsCulqiByStudentRepository = module.get<PaymentsCulqiByStudentRepository>(PaymentsCulqiByStudentRepository);
  });

  it('should be defined', () => {
    expect(paymentsCulqiByStudentService).toBeDefined();
  });

  it('throws an error if the studentId is not provided', async() => {
    const req: PaymentsCulqiByStudentRequest = {
      studentId: ''
    }

    await expect(paymentsCulqiByStudentService.request(req)).rejects.toThrow(IncompleteRequestError);
  });

  it('should return payments by student', async () => {
    const studentId = "00001358812";
    const mockResponse = [
        {
          itemNbr: "000000000000384",
          description: "EXAMEN DE REZAGADOS",
          amount: 74,
          amountPaid: 0,
          dueDate: 1695445200000,
          billingDate: 18000000,
          paymentPenalty: 0,
          paymentPenaltyPaid: 0,
          paymentType: "V08",
          amountWithoutBenefits: 74,
          periodCode: "2233",
          discountProntoPago: 0
        }
      ];
    
    jest.spyOn(paymentsCulqiByStudentRepository, 'find').mockResolvedValue(mockResponse);

    const result = await paymentsCulqiByStudentRepository.find(studentId);
    expect(result).toEqual(
      expect.arrayContaining(mockResponse),
    );
  });
  
});
