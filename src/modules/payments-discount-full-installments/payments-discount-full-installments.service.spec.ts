import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsDiscountFullInstallmentsService } from './payments-discount-full-installments.service';
import { PaymentsDiscountFullInstallmentsRepository } from './payments-discount-full-installments.repository';
import { IncompleteRequestError } from '../../shared/utils/errors/types';

describe('PaymentsDiscountFullInstallmentsService', () => {
  let service: PaymentsDiscountFullInstallmentsService;
  let repository: PaymentsDiscountFullInstallmentsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsDiscountFullInstallmentsService,
        {
          provide: PaymentsDiscountFullInstallmentsRepository,
          useValue: {
            find: jest.fn(() => [])
          }
        }
      ],
    }).compile();

    service = module.get<PaymentsDiscountFullInstallmentsService>(PaymentsDiscountFullInstallmentsService);
    repository = module.get<PaymentsDiscountFullInstallmentsRepository>(PaymentsDiscountFullInstallmentsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('throw an error if the studentId is not provided', async() => {
    const req = {
      studentId: '',
      period: '2233',
      career: 'PREG'
    };

    await expect(service.request(req)).rejects.toThrow(IncompleteRequestError);
  });

  it('throw an error if the period is not provided', async() => {
    const req = {
      studentId: '00001358812',
      period: '',
      career: 'PREG'
    };

    await expect(service.request(req)).rejects.toThrow(IncompleteRequestError);
  });

  it('throw an error if the career is not provided', async() => {
    const req = {
      studentId: '00001358812',
      period: '2233',
      career: ''
    };

    await expect(service.request(req)).rejects.toThrow(IncompleteRequestError);
  });
});
