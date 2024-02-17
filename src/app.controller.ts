import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status')
  getStatus(): string {
    return this.appService.getStatus();
  }

  @Get('environment')
  getEnv():any {
    const database_name = this.configService.get<string>('DATABASE_NAME')
    return database_name
  }
}