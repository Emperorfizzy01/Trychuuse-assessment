import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import config from '../config/did.json';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [
      TypeOrmModule.forFeature([User]),
      ConfigModule.forRoot(),
      JwtModule.register({ secret: config.secret }),
    ],
    controllers: [UserController],
    providers: [UserService],
  })
  export class UserModule {}