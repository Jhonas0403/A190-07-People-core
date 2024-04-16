import { Test, TestingModule } from '@nestjs/testing';
import { PaymentDetailController } from './payment-detail.controller';
import { PaymentDetailService } from './payment-detail.service';
import { HttpResponse } from '../../infraestructure/entities/HttpResponse';

describe('PaymentDetailController', () => {
  let controller: PaymentDetailController;
  let service: PaymentDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentDetailController],
      providers: [
        {
          provide: PaymentDetailService,
          useValue: {
            request: jest.fn(() => [])
          }
        }
      ]
    }).compile();

    controller = module.get<PaymentDetailController>(PaymentDetailController);
    service = module.get<PaymentDetailService>(PaymentDetailService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return payment detail', async() => {
    const req = {
      studentId: '00001358812',
      itemNbr: '000000000000384'
    };
    const data = [];
    const httpResponse = new HttpResponse({ status: 'Success', message: 'Payment Detail Found', data }, 200);
    const result = await controller.getPaymentDetail(req.studentId, req.itemNbr);
    expect(result).toEqual(httpResponse.body);

  })

  it('should call service.request', async() => {
    const req = {
      studentId: '00001358812',
      itemNbr: '000000000000384'
    };

    await controller.getPaymentDetail(req.studentId, req.itemNbr);
    expect(service.request).toHaveBeenCalledWith(req);
  })
});
