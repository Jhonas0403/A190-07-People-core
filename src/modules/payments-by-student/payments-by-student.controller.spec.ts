import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsByStudentController } from './payments-by-student.controller';
import { PaymentsByStudentService } from './payments-by-student.service';
import { HttpResponse } from '../../infraestructure/entities/HttpResponse';

describe('PaymentsByStudentController', () => {
  let controller: PaymentsByStudentController;
  let service: PaymentsByStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsByStudentController],
      providers: [
        {
          provide: PaymentsByStudentService,
          useValue: {
            request: jest.fn(() => [])
          }
        }
      ]
    }).compile();

    controller = module.get<PaymentsByStudentController>(PaymentsByStudentController);
    service = module.get<PaymentsByStudentService>(PaymentsByStudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return payments by student', async () => {
    const req = {
      studentId: '00001358812',
      period: '2233'
    };
    const data = [];
    const httpResponse = new HttpResponse({ status: 'Success', message: 'Payments found', data }, 200);
    const response = await controller.getPaymentsByStudent(req.studentId, req.period);
    expect(response).toEqual(httpResponse.body);
  });

  it ('should call service.request', async () => {
    const req = {
      studentId: '00001358812',
      period: '2233'
    };

    await controller.getPaymentsByStudent(req.studentId, req.period);
    expect(service.request).toHaveBeenCalledWith(req);
  });

});
