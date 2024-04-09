import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PaymentsByStudentModule } from './modules/PaymentsByStudent/PaymentsByStudent.module';
import { QaasApiModule } from './infraestructure/Qaas/QaasApi.module';
import { PaymentConstModule } from './utils/PaymentConst.module';
import { PaymentsCulqiByStudentModule } from './modules/payments-culqi-by-student/payments-culqi-by-student.module';
@Global()
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
    PaymentsByStudentModule,
    QaasApiModule,
    PaymentConstModule,
    PaymentsCulqiByStudentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
