export class CreateUserDto {
    readonly id?: number;
    readonly accountName: string;
    readonly accountPassword: string;
    readonly initialDeposit: number;
}