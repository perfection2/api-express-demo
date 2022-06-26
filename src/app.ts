import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { json } from 'body-parser';
import 'reflect-metadata';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IConfigService } from './config/config.service.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { UserController } from './users/users.controller';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';
import { TicketController } from './tickets/ticket.controller';

@injectable()
export class App {
	// здесь просто описываем переменные и их типизацию
	app: Express;
	server: Server | undefined;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		// все контролллеры с методами api
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.TicketController) private ticketController: TicketController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json()); // bodyParser
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	/* Методы с роутами для каждого контроллера */
	useRoutes(): void {
		this.app.use('/users', this.userController.router);
		this.app.use('/tickets', this.ticketController.router);
	}

	/* Фильтры для ошибок */
	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	/* Метод для запуска сервера. Важен порядок, поэтому сначала роуты */
	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		await this.prismaService.connect(); // подключение к бд
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}

	/* Метод для завершения приложения после тестов */
	public close(): void {
		this.server?.close();
	}
}
