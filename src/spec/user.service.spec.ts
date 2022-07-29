import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/user.dto';

describe("UserController Unit Tests", () => {
  let userController: UserController;
  let spyService: UserService
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        createAccount: jest.fn(() => {}),
        login: jest.fn(() => { }),
        withdraw: jest.fn(() => { }),
        deposit: jest.fn(() => { }),
        accountInfo: jest.fn(() => { }),
        getStatement: jest.fn(() => [ ])
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, ApiServiceProvider],
    }).compile();

    userController = app.get<UserController>(UserController);
    spyService = app.get<UserService>(UserService);
  })

  it("calling create account method", () => {
    const dto = new CreateUserDto();
    expect(userController.createAccount(dto)).not.toEqual(null);
  })

  it("calling create account method", () => {
    const dto = new CreateUserDto();
    userController.createAccount(dto);
    expect(spyService.createAccount).toHaveBeenCalled();
    expect(spyService.createAccount).toHaveBeenCalledWith(dto);
  })

  it("should return an object", () => {
    const dto = new CreateUserDto();
    userController.login(dto);
    expect(spyService.login).toHaveBeenCalled();
    expect(spyService.login).toHaveBeenCalledWith(dto);
  })

  it("Process withdrawal", () => {
    const dto = new CreateUserDto();
    userController.withdraw("eyJhbGciOiJIUzI1NiI", dto);
    expect(spyService.withdraw).toHaveBeenCalled();
    expect(spyService.withdraw).toHaveBeenCalledWith(dto, "eyJhbGciOiJIUzI1NiI");
  })

  it("Process deposit", () => {
    const dto = new CreateUserDto();
    userController.deposit(dto);
    expect(spyService.deposit).toHaveBeenCalled();
    expect(spyService.deposit).toHaveBeenCalledWith(dto);
  })

  it("Should return acccount info object", () => {
    userController.accountInfo("eyJhbGciOiJIUzI1NiI", "4765290153");
    expect(spyService.accountInfo).toHaveBeenCalled();
    expect(spyService.accountInfo).toHaveBeenCalledWith( "eyJhbGciOiJIUzI1NiI", "4765290153");
  })

  it("Should return array of account statement", () => {
    userController.getStatement("eyJhbGciOiJIUzI1NiI", "4765290153");
    expect(spyService.getStatement).toHaveBeenCalled();
    expect(spyService.getStatement).toHaveBeenCalledWith( "eyJhbGciOiJIUzI1NiI", "4765290153");
  })
  



  // it("calling getAllNote method", () => {
  //   noteController.getAllNote();
  //   expect(spyService.findAllNotes).toHaveBeenCalled();
  // })

  // it("calling find NoteById method", () => {
  //   const dto = new GetNoteById();
  //   dto.id = '3789';
  //   noteController.getNoteById(dto);
  //   expect(spyService.findOneNote).toHaveBeenCalled();
  // })

});