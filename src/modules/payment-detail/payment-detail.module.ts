import { Module } from '@nestjs/common';
import { PaymentDetailController } from './payment-detail.controller';
import { PaymentDetailService } from './payment-detail.service';
import { PaymentDetailRepository } from './payment-detail.repository';

@Module({
  controllers: [PaymentDetailController],
  providers: [PaymentDetailService, PaymentDetailRepository]
})
export class PaymentDetailModule {}
