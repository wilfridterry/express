import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Is not valid email' })
	email: string;

	@IsString({ message: 'Is not valid string' })
	password: string;

	@IsString({ message: 'Is not valid name' })
	name: string;
}
