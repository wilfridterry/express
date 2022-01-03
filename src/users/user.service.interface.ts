import { UserModel } from '@prisma/client';
import { UserLoginDto } from './DTO/user-login.dto';
import { UserRegisterDto } from './DTO/user-register.dto';
import { User } from './user.entity';

export interface IUserService {
	createUser(dto: UserRegisterDto): Promise<UserModel | null>;
	verifyUser(dto: UserLoginDto): Promise<boolean>;
}
