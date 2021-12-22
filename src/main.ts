import { App } from "./app";
import { ExeptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";

async function bootstrap() {
    const logger: LoggerService = new LoggerService();
    const userController = new UserController(logger);
    const exceptionFilter = new ExeptionFilter(logger);
    const app: App = new App(logger, [userController], exceptionFilter);

    await app.init();
}

bootstrap();