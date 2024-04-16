import { Test, TestingModule } from '@nestjs/testing';
import { PaymentDetailService } from './payment-detail.service';
import { PaymentDetailRepository } from './payment-detail.repository';
import { DataNotFoundException, IncompleteRequestError } from '../../shared/utils/errors/types';

describe('PaymentDetailService', () => {
  let service: PaymentDetailService;
  let respository: PaymentDetailRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentDetailService,
        {
          provide: PaymentDetailRepository,
          useValue: {
            find: jest.fn(() => [])
          }
        }
      ],
    }).compile();

    service = module.get<PaymentDetailService>(PaymentDetailService);
    respository = module.get<PaymentDetailRepository>(PaymentDetailRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('throws an error if studentId is not provided', async () => {
    const req = {
      studentId: '',
      itemNbr: '000000000000384'
    };

    await expect(service.request(req)).rejects.toThrow(IncompleteRequestError);
  });
  
  it('throws an error if itemNbr is not provided', async () => {
    const req = {
      studentId: '00001358812',
      itemNbr: ''
    };

    await expect(service.request(req)).rejects.toThrow(IncompleteRequestError);
  });

  it('should return payment detail', async () => {
    const req = {
      studentId: '00001358812',
      itemNbr: '000000000000384'
    };
    const mockResponse = [
      {
        studentId: "00001358812",
        businessUnit: "UNUTP",
        career: "PREG",
        itemNbr: "000000000000384",
        description: "EXAMEN DE REZAGADOS",
        amount: 74,
        amountPaid: 0,
        dueDate: 1695445200000,
        billingDate: 18000000,
        paymentPenalty: 0,
        paymentPenaltyPaid: 0,
        discountProntoPago: 0,
        paymentType: "V08",
        amountWithoutBenefits: 74,
        period: "2233"
     }
    ];

    jest.spyOn(respository, 'find').mockResolvedValue(mockResponse);

    const response = await service.request(req);
    expect(response).toEqual(
      expect.arrayContaining(mockResponse)
    )
  });

  it('throws an error if data is not found', async () => {
    const req = {
      studentId: '00001358812',
      itemNbr: '000000000000384'
    };

    await expect(service.request(req)).rejects.toThrow(DataNotFoundException);
  });

});

