import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Transaction } from './entities/transaction.entity';
import { JwtModule } from '@nestjs/jwt';
import config from '../config/did.json';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [
      TypeOrmModule.forFeature([User, Transaction]),
      ConfigModule.forRoot(),
      JwtModule.register({ secret: config.secret }),
    ],
    controllers: [UserController],
    providers: [UserService],
  })
  export class UserModule {}