import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserInterface } from './interface/user.interface';
import { Errormessage } from 'src/Errormessage';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


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
                const saltRounds = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(user.accountPassword, saltRounds)
                user.accountPassword = hashPassword
                const newUser = await this.userModel.save(user);
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

    async login(userDto: CreateUserDto): Promise<any> {
        try {
            const userExist = await this.userModel.findOneBy({
                accountName: userDto.accountName.toLowerCase(),
            })
            if(!userExist) throw new NotFoundException(Errormessage.IncorrectData);
            const match = await bcrypt.compare(userDto.accountPassword, userExist.accountPassword)
            if(!match) throw new NotFoundException(Errormessage.IncorrectData);
            // Create a token
            const payload = { id: userExist.id, accountName: userExist.accountName };
            const options = { expiresIn: '2d' };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, options)
            return { 
                success: true, 
                accessToken: token 
            };
        } catch (err) {
            throw err
        }
    }
}



