import { App } from "./app";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";

async function bootstrap() {
    const logger: LoggerService = new LoggerService();
    const userController = new UserController(logger);
    
    const app: App = new App(logger, [userController]);

    await app.init();
}

bootstrap();