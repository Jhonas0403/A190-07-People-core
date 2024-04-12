import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsCulqiByStudentService } from './payments-culqi-by-student.service';
import { PaymentsCulqiByStudentRepository } from './payments-culqi-by-student.repository';

describe('PaymentsCulqiByStudentService', () => {
  let service: PaymentsCulqiByStudentService;

  beforeEach(async () => {

    const paymentsRepository = {
      find: () => Promise.resolve([]),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsCulqiByStudentService,
        {
          provide: PaymentsCulqiByStudentRepository,
          useValue: paymentsRepository,
        }
      ],
    }).compile();

    service = module.get<PaymentsCulqiByStudentService>(PaymentsCulqiByStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return payments by student', async () => {
    const payments = await service.request({ studentId: '00001358812' });
    expect(payments).toBeDefined();

  });

  it('throws an error if the studentId is not provided', async() => {
    await service.request({ studentId: '' });

  })
});
