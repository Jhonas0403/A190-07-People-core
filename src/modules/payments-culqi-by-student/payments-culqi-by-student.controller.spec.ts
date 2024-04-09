import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsCulqiByStudentController } from './payments-culqi-by-student.controller';

describe('PaymentsCulqiByStudentController', () => {
  let controller: PaymentsCulqiByStudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsCulqiByStudentController],
    }).compile();

    controller = module.get<PaymentsCulqiByStudentController>(PaymentsCulqiByStudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
