import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'text' })
  accountName: string;

  @Column({ nullable: true, type: 'text' })
  accountPassword: string;

  @Column({ nullable: true, unique: true})
  accountNumber: string;

  @Column({ nullable: true })
  initialDeposit: number;
}
