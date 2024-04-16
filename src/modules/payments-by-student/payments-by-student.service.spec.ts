import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsByStudentService } from './payments-by-student.service';
import { PaymentsByStudentRepository } from './payments-by-student.repository';
import { DataNotFoundException, IncompleteRequestError } from '../../shared/utils/errors/types';

describe('PaymentsByStudentService', () => {
  let service: PaymentsByStudentService;
  let repository: PaymentsByStudentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsByStudentService,
        {
          provide: PaymentsByStudentRepository,
          useValue: {
            find: jest.fn(() => [])
          }
        }
      ],
    }).compile();

    service = module.get<PaymentsByStudentService>(PaymentsByStudentService);
    repository = module.get<PaymentsByStudentRepository>(PaymentsByStudentRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('throw an error if studentIs is not provided', async () => {
    const req = {
      studentId: '',
      period: '2233'
    }
    await expect(service.request(req)).rejects.toThrow(IncompleteRequestError);
  });

  it('throw an error if period is not provided', async () => {
    const req = {
      studentId: '00001358812',
      period: ''
    }
    await expect(service.request(req)).rejects.toThrow(IncompleteRequestError);
  });

  it('throw an error if data not found', async() => {
    const req = {
      studentId: '00001358812',
      period: '2233'
    };

    await expect(service.request(req)).rejects.toThrow(DataNotFoundException);
  })

});
