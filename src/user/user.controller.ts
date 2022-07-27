import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { UserInterface } from './interface/user.interface';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Post('/')
  create(@Body() createDto: CreateUserDto): Promise<UserInterface> {
    return this.service.createAccount(createDto);
  }

//   @Post('/verify')
//   login(@Body() createDto: CreateUserDto): Promise<any> {
//     return this.service.verifyUser(createDto);
//   }
}