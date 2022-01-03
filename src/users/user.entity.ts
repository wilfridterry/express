import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(private readonly _email: string, private readonly _name: string, password?: string) {
		if (password) {
			this._password = password;
		}
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	async comparePassword(password: string): Promise<boolean> {
		return await compare(password, this.password);
	}
}
