import 'reflect-metadata';
import { UserModel } from '@prisma/client';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserService } from './users.service';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let userRepository: IUsersRepository;
let userService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	userRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	userService = container.get<IUserService>(TYPES.UserService);
});

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValue('1');
		userRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		const createdUser = await userService.createUser({
			email: 'a@a.com',
			name: 'Name',
			password: 'dddd',
		});

		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual(1);
	});
});
