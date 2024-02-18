import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform:true}));
  app.use(cors({
    origin: 'http://127.0.0.1:5500' // ระบุโดเมนหรือ URL ของเว็บไซต์ของคุณที่อนุญาตเข้าถึงข้อมูล
  }));
  await app.listen(2000);
}
bootstrap();