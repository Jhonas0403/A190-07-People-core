import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsByStudentController } from './modules/controllers/PaymentsByStudent/PaymentsByStudent.controller';
import { PaymentsByStudentService } from './modules/controllers/PaymentsByStudent/PaymentsByStudent.service';
import { PaymentsByStudentRepository } from './modules/controllers/PaymentsByStudent/PaymentsByStudent.repository';
@Module({
  imports: [],
  controllers: [AppController, PaymentsByStudentController],
  providers: [AppService, PaymentsByStudentService, PaymentsByStudentRepository],
})
export class AppModule {}
