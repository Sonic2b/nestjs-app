import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService, { provide: 'UserModelToken', useValue: {} }],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{ name: 'jack', age: 12, breed: 'A' }];
      jest.spyOn(usersService, 'findAll').mockImplementation(() => result);
      expect(await usersController.findAll()).toBe(result);
    });
  });
});
