export class CreateUserDto {
    readonly id?: number;
    readonly accountName: string;
    readonly accountPassword: string;
    readonly accountNumber: string;
    readonly initialDeposit: number;
    readonly withdraw: number;
    readonly amount: number;
    readonly balance: number;
    readonly narration: string;
}