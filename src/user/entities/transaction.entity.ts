import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: "text", enum: ["deposit", "withdrawal"] })
  transactionType: string;

  @Column({ nullable: true})
  narration: string;

  @Column()
  transactionDate: Date;

  @Column({ nullable: true })
  accountNumber: string

  @Column({ nullable: true })
  amount: number

  @Column({ nullable: true })
  accountBalance: number


}