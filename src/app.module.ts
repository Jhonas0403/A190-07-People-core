import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PaymentsByStudentModule } from './modules/controllers/PaymentsByStudent/PaymentsByStudent.module';
import { QaasApiModule } from './infraestructure/Qaas/QaasApi.module';
@Global()
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
    PaymentsByStudentModule,
    QaasApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
