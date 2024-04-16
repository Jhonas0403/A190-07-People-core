import { Global, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { QaasApiModule } from './infraestructure/Qaas/QaasApi.module';
import { PaymentConstModule } from './utils/PaymentConst.module';
import { PaymentsCulqiByStudentModule } from './modules/payments-culqi-by-student/payments-culqi-by-student.module';
import { QaasApiService } from './infraestructure/Qaas/QaasApi.service';
import { PaymentsByStudentController } from './modules/payments-by-student/payments-by-student.controller';
import { PaymentsByStudentModule } from './modules/payments-by-student/payments-by-student.module';
import { PaymentsDiscountFullInstallmentsModule } from './modules/payments-discount-full-installments/payments-discount-full-installments.module';
import { PaymentDetailModule } from './modules/payment-detail/payment-detail.module';
@Global()
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
    PaymentsByStudentModule,
    QaasApiModule,
    PaymentConstModule,
    PaymentsCulqiByStudentModule,
    PaymentsDiscountFullInstallmentsModule,
    PaymentDetailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit{
  constructor(private readonly qaasApiService: QaasApiService) {}
  async onModuleInit() {
    this.qaasApiService.init();
  }
 }
