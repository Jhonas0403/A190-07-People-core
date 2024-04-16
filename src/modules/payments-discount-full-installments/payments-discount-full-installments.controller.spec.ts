import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsDiscountFullInstallmentsController } from './payments-discount-full-installments.controller';
import { PaymentsDiscountFullInstallmentsService } from './payments-discount-full-installments.service';
import { HttpResponse } from '../../infraestructure/entities/HttpResponse';

describe('PaymentsDiscountFullInstallmentsController', () => {
  let controller: PaymentsDiscountFullInstallmentsController;
  let service: PaymentsDiscountFullInstallmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsDiscountFullInstallmentsController],
      providers:[
        {
          provide: PaymentsDiscountFullInstallmentsService,
          useValue: {
            request: jest.fn(() => []),
          }
        }
      ]
    }).compile();

    controller = module.get<PaymentsDiscountFullInstallmentsController>(PaymentsDiscountFullInstallmentsController);
    service = module.get<PaymentsDiscountFullInstallmentsService>(PaymentsDiscountFullInstallmentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return payments discount full installments', async () => {
    const req = {
      studentId: '00001358812',
      period: '2233',
      career: 'PREG'
    };
    const data = [];

    const httpResponse = new HttpResponse({ status: 'Success', message: 'Discount Full Installments', data }, 200);
    const result = await controller.getDiscountFullInstallments(req.studentId, req.period, req.career);

    expect(result).toEqual(httpResponse.body);
    expect(service.request).toHaveBeenCalledWith(req);
  });

});
