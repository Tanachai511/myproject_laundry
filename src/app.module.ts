import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { Cart } from './cart/cart.entities';
import { Service } from './service/service.entities';
import { ServiceController } from './service/service.controller';
import { ServiceService } from './service/service.service';
import { PaymentController } from './payment/payment.controll';
import { PaymentService } from './payment/Payment.service';
import { Payment } from './payment/payment.entities';
import { User } from './user/user.entities';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports :
      [ConfigModule],
      useFactory : (configService : ConfigService) => {
        let option : TypeOrmModule = {
          type : "sqlite",
          database : configService.get<string>("DATABASE_NAME"),
          entities : [Cart,Service,Payment,User],
          synchronize : true,
        };
        return option;
      },
      inject:[ConfigService]
    }),
    TypeOrmModule.forFeature([Cart,Service,Payment,User]),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, CartController,ServiceController, PaymentController],
  providers: [AppService, CartService, ServiceService, PaymentService]
})
export class AppModule {}