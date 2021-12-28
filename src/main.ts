import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { BaseController } from './core/base.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { Exception } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { IUserController } from './users/usercontroller.interface';
import { UserController } from './users/users.controller';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<Exception>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.IUserController).to(UserController);
	bind<App>(TYPES.Application).to(App);
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);

	await app.init();
	return { appContainer, app };
}

export const boot = bootstrap().then((res) => console.log(res));

console.log(boot);
