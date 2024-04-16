import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsCulqiByStudentController } from './payments-culqi-by-student.controller';
import { PaymentsCulqiByStudentService } from './payments-culqi-by-student.service';
import { HttpResponse } from '../../infraestructure/entities/HttpResponse';

describe('PaymentsCulqiByStudentController Unit Tests', () => {
  let paymentsCulqiByStudentController: PaymentsCulqiByStudentController;
  let paymentsCulqiByStudentService: PaymentsCulqiByStudentService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsCulqiByStudentController],
      providers: [
        PaymentsCulqiByStudentService,
        {
          provide: PaymentsCulqiByStudentService,
          useValue: {
            request: jest.fn(() => [])
          }
        }
      ]
    }).compile();

    paymentsCulqiByStudentController = module.get<PaymentsCulqiByStudentController>(PaymentsCulqiByStudentController);
    paymentsCulqiByStudentService = module.get<PaymentsCulqiByStudentService>(PaymentsCulqiByStudentService);
  });

  it('should be defined', () => {
    expect(paymentsCulqiByStudentController).toBeDefined();
  });

  it('should return payments by student', async () => {
    const studentId= "00001358812";
    const data = [];

    const httpResponse = new HttpResponse({ status: 'Success', message: 'Payments found', data }, 200);
    const result = await paymentsCulqiByStudentController.getPaymentsCulqiByStudent(studentId);
 
    expect(result).toEqual(httpResponse.body);
    expect(paymentsCulqiByStudentService.request).toHaveBeenCalledWith({ studentId });
  });
});
