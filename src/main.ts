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

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);

	app.init();

	return { appContainer, app };
}

export const { appContainer, app } = bootstrap();

// async function bootstrap() {
//     // const logger: LoggerService = new LoggerService();
//     // const userController = new UserController(logger);
//     // const exceptionFilter = new ExeptionFilter(logger);
//     // const app: App = new App(logger, [userController], exceptionFilter);

//     // await app.init();
// }
