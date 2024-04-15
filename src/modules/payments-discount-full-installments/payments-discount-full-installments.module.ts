import { Module } from '@nestjs/common';
import { PaymentsDiscountFullInstallmentsController } from './payments-discount-full-installments.controller';
import { PaymentsDiscountFullInstallmentsService } from './payments-discount-full-installments.service';
import { PaymentsDiscountFullInstallmentsRepository } from './payments-discount-full-installments.repository';

@Module({
  controllers: [PaymentsDiscountFullInstallmentsController],
  providers: [PaymentsDiscountFullInstallmentsService, PaymentsDiscountFullInstallmentsRepository]
})
export class PaymentsDiscountFullInstallmentsModule {}
