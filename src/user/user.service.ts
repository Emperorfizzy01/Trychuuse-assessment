import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserInterface } from './interface/user.interface';
import { Errormessage } from 'src/Errormessage';
import { CreateUserDto } from './dto/user.dto';
// import sgMail from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';


function numberGenerator() {
    var digits = Math.floor(Math.random() * 9000000000) + 1000000000;
    return digits
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userModel: Repository<User>,
      ) {}
    async createAccount(userDto: CreateUserDto): Promise<any> {
        try {
           const userExist = await this.userModel.findOneBy({
               accountName: userDto.accountName.toLowerCase(),
           })
           if(!userExist) {
            if(userDto.initialDeposit < 500) {
                throw new NotFoundException(Errormessage.InsufficientDeposit)
            } else {
                const user = this.userModel.create({
                    accountName: userDto.accountName.toLowerCase(),
                    accountPassword: userDto.accountPassword,
                    initialDeposit: userDto.initialDeposit,
                    accountNumber: numberGenerator().toString()
                 })
                 const newUser = await this.userModel.save(user);
                 console.log(newUser);
                 return {
                    responseCode: 201,
                    success: true,
                    message: 'Account successfully created',
                    newUser: newUser,
                 }
            } 
           }
           throw new NotFoundException(Errormessage.UserExist)
        } catch(err) {
            throw err
        }
    }
}