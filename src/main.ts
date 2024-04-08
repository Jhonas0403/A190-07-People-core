import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import logger from './shared/utils/logger';



const httpPort = process.env.PORT || '4000';

const AWSXRay = require('aws-xray-sdk');
AWSXRay.captureHTTPsGlobal(require('https'));
AWSXRay.captureHTTPsGlobal(require('http'));

async function createApplication(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(AWSXRay.express.openSegment('"core-academics-schedule'));

  const config = new DocumentBuilder()
    .setTitle('A190-17-ms-core-academics-schedule')
    .setDescription('API documentation A190-17-ms-core-academics-schedule')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  return app;
}

// Función para iniciar la aplicación
async function startApplication() {
  const app = await createApplication();
  app.use(bodyParser.json());
  app.use(AWSXRay.express.closeSegment());
  await app.listen(httpPort);
  logger.info({
    action: 'startup',
    message: `Listening on the port: ${httpPort}`,
  });
}

async function restartApplication() {
  const app = await createApplication();
  await app.listen(httpPort);
}

async function checkHealth() {
  try {
    
  } catch (error) {
    await restartApplication();
  }
}
// Inicia la aplicación al arrancar
startApplication();
// Realiza la verificación de salud periódicamente cada 10 segundos
setInterval(checkHealth, 10000);
