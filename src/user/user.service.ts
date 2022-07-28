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
                    balance: userDto.initialDeposit,
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
            const payload = { id: userExist.id, accountNumber: userExist.accountNumber};
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

    async withdraw(userDto: CreateUserDto, token: string): Promise<any> {
        try {
            // @ts-ignore
            const { accountNumber }  = jwt.verify(token, process.env.JWT_SECRET);
            if(accountNumber === userDto.accountNumber) {
                const userExist = await this.userModel.findOneBy({
                         accountNumber: userDto.accountNumber
                })
                if(!userExist) throw new NotFoundException(Errormessage.IncorrectData);
                const match = await bcrypt.compare(userDto.accountPassword, userExist.accountPassword) 
                if(!match) throw new NotFoundException(Errormessage.IncorrectData);
                if(userDto.withdraw < 1) throw new NotFoundException(Errormessage.minimumWithdrawal)
                if(userExist.balance - userDto.withdraw < 500) {
                    throw new NotFoundException(Errormessage.InsufficientBalance)
                } else {
                    const newBalance = userExist.balance - userDto.withdraw
                    userExist.balance = newBalance
                    const updatedUser = await this.userModel.save(userExist);
                    return {
                        responseCode: 200,
                        success: true,
                        message: "Withdrawal successful"
                    }
                }
            }
            throw new NotFoundException(Errormessage.InvalidToken);
        } catch (err) {
            throw err
        }
    }

    async deposit(userDto: CreateUserDto): Promise<any> {
        const user = await this.userModel.findOneBy({
            accountNumber: userDto.accountNumber
        })
        if(user) {
            if(userDto.amount > 1000000 || userDto.amount < 100) throw new NotFoundException(Errormessage.transferrableAmount)
            const newBalance = user.balance + userDto.amount
            user.balance = newBalance
            const updatedBalance = await this.userModel.save(user)
            return { 
                responseCode: 200,
                success: true,
                message: "Transfer successful"
            }
        }
        throw new NotFoundException(Errormessage.unknownUser);
    }

    async accountInfo(token: string, userAccountNumber: any): Promise<any> {
        // @ts-ignore
        const { accountNumber } = jwt.verify(token, process.env.JWT_SECRET);
        if(accountNumber === userAccountNumber) {
            const userExist = await this.userModel.findOneBy({
                accountNumber: userAccountNumber
       })
       if(!userExist) throw new NotFoundException(Errormessage.IncorrectData);
        return {
            responseCode: 200,
            success: true,
            message: "Account info fetched",
            account: {
               accountName: userExist.accountName,
               accountNumber: userExist.accountNumber,
               balance: userExist.balance
            }
        }
        }
        throw new NotFoundException(Errormessage.InvalidToken);
    }
}



