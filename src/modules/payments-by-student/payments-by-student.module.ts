import { Module } from '@nestjs/common';
import { PaymentsByStudentService } from './payments-by-student.service';
import { PaymentsByStudentController } from './payments-by-student.controller';
import { PaymentsByStudentRepository } from './payments-by-student.repository';

@Module({
  controllers: [PaymentsByStudentController],
  providers: [PaymentsByStudentService, PaymentsByStudentRepository]
})
export class PaymentsByStudentModule {}
