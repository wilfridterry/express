import { injectable } from 'inversify';
import { UserLoginDto } from './DTO/user-login.dto';
import { UserRegisterDto } from './DTO/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import 'reflect-metadata';

@injectable()
export class UserService implements IUserService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		//to check if exists
		return null;
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		return true;
	}
}
