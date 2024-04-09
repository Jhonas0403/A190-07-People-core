import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsCulqiByStudentService } from './payments-culqi-by-student.service';

describe('PaymentsCulqiByStudentService', () => {
  let service: PaymentsCulqiByStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsCulqiByStudentService],
    }).compile();

    service = module.get<PaymentsCulqiByStudentService>(PaymentsCulqiByStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
