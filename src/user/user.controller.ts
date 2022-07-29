import { Body, Controller, Post, Headers, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { UserInterface } from './interface/user.interface';

@Controller('')
export class UserController {
  constructor(private service: UserService) {}

  @Post('/create_account')
  createAccount(@Body() createDto: CreateUserDto): Promise<UserInterface> {
    return this.service.createAccount(createDto);
  }

  @Post('/login')
  login(@Body() createDto: CreateUserDto): Promise<any> {
    return this.service.login(createDto);
  }

  @Post('/withdraw')
  withdraw(@Headers('token')token: string, @Body() createDto: CreateUserDto, ) {
    return this.service.withdraw(createDto, token);
  }

  @Post('/deposit')
  deposit(@Body() createDto: CreateUserDto): Promise<any> {
    return this.service.deposit(createDto);
  }

  @Get('/account_info/:userAccountNumber')
  accountInfo(@Headers('token') token: string,  @Param('userAccountNumber') userAccountNumber: string): Promise<any> {
    return this.service.accountInfo(token, userAccountNumber);
  }

  @Get('/account_statement/:userAccountNumber')
  getStatement(@Headers('token') token: string,  @Param('userAccountNumber') userAccountNumber: string): Promise<any> {
    return this.service.getStatement(token, userAccountNumber);
  }

}