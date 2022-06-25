import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IUserService } from './users/user.service.interface';
import { IUserController } from './users/users.controller.interface';
import { UserService } from './users/user.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { UsersRepository } from './users/users.repository';
import { IUsersRepository } from './users/users.repository.interface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

// const logger = new LoggerService();
// const app = new App(new LoggerService(), new UserController(logger), new ExceptionFilter(logger));
/* Выше старый ручной DI, ниже норм реализация через контейнер */

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope(); // будет инстанциироваться singleton этого сервиса (инстанс класса будет создан один раз, а затем передан во все сервисы контроллеры и тп, где у нас есть inject)
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<App>(TYPES.Applications).to(App);
});

async function boostrap(): Promise<IBootstrapReturn> {
	// контейнер - "коробка", в которую мы будем класть биндинги Символов на типы на конкретные реализации, а затем переиспользовать
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Applications);
	await app.init();

	return { appContainer, app };
}

export const boot = boostrap();
