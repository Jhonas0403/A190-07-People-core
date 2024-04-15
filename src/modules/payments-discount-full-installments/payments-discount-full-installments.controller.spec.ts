import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsDiscountFullInstallmentsController } from './payments-discount-full-installments.controller';

describe('PaymentsDiscountFullInstallmentsController', () => {
  let controller: PaymentsDiscountFullInstallmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsDiscountFullInstallmentsController],
    }).compile();

    controller = module.get<PaymentsDiscountFullInstallmentsController>(PaymentsDiscountFullInstallmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
