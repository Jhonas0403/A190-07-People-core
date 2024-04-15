import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsDiscountFullInstallmentsService } from './payments-discount-full-installments.service';

describe('PaymentsDiscountFullInstallmentsService', () => {
  let service: PaymentsDiscountFullInstallmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsDiscountFullInstallmentsService],
    }).compile();

    service = module.get<PaymentsDiscountFullInstallmentsService>(PaymentsDiscountFullInstallmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
