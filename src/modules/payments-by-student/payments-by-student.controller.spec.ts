import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsByStudentController } from './payments-by-student.controller';

describe('PaymentsByStudentController', () => {
  let controller: PaymentsByStudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsByStudentController],
    }).compile();

    controller = module.get<PaymentsByStudentController>(PaymentsByStudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
