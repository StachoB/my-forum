import { ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express } from 'express';
import { Server, ServerOptions } from 'spdy';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
