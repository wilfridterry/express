import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Is not valid email' })
	email: string;

	@IsString({ message: 'Is not valid password' })
	password: string;
}
