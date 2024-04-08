import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsByStudentController } from './src/controllers/PaymentsByStudent/PaymentsByStudent.controller';
import { PaymentsByStudentService } from './src/controllers/PaymentsByStudent/PaymentsByStudent.service';
import { PaymentsByStudentRepository } from './src/controllers/PaymentsByStudent/PaymentsByStudent.repository';
@Module({
  imports: [],
  controllers: [AppController, PaymentsByStudentController],
  providers: [AppService, PaymentsByStudentService, PaymentsByStudentRepository],
})
export class AppModule {}
