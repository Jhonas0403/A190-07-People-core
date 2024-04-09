import { Module } from '@nestjs/common';
import { PaymentsCulqiByStudentController } from './payments-culqi-by-student.controller';
import { PaymentsCulqiByStudentService } from './payments-culqi-by-student.service';
import { PaymentsCulqiByStudentRepository } from './payments-culqi-by-student.repository';

@Module({
  controllers: [PaymentsCulqiByStudentController],
  providers: [PaymentsCulqiByStudentService, PaymentsCulqiByStudentRepository]
})
export class PaymentsCulqiByStudentModule {}
