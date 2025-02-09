import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './configs/config.type';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';

import * as express from 'express';
import { join } from 'path';
import Redis from 'ioredis';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  console.log(process.env.POSTGRES_DB);
  console.log(Redis);
  console.log("JWT_ACCESS_SECRET:", process.env.JWT_ACCESS_SECRET);


  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');


  const documentConfig = new DocumentBuilder()
    .setTitle('Nest Project')
    .setDescription('The nest-2024 API description')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 3,
      persistAuthorization: true,
    },
  });
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use('/upload', express.static(join(process.cwd(), 'upload')));
  const configService = app.get(ConfigService);
  const config = configService.get<AppConfig>('app');
  console.log(config);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
