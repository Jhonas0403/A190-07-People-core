import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsByStudentService } from './payments-by-student.service';

describe('PaymentsByStudentService', () => {
  let service: PaymentsByStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsByStudentService],
    }).compile();

    service = module.get<PaymentsByStudentService>(PaymentsByStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
