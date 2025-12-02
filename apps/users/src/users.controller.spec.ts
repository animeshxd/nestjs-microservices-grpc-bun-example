import { Test, type TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RpcException } from '@nestjs/microservices';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(usersController.sayHello({ name: 'World' })).toEqual({
        message: 'Hello World!',
      });
    });

    it('should raise RpcException', () => {
      expect(() =>
        usersService.sayBye({ email: 'hello@gmail.com', name: 'he' }),
      ).toThrow(RpcException);
    });
  });
});
