import { BaseController } from '../common/base.controller';
import { ITicketController } from './ticket.controller.interface';
import { NextFunction, Request, Response } from 'express';
import { TicketCreateDto } from './dto/ticket-create.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { AuthGuard } from '../common/auth.guard';
import { ITicketService } from './ticket.service.interface';

@injectable()
export class TicketController extends BaseController implements ITicketController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.TicketService) private ticketService: ITicketService,
	) {
		super(loggerService);
		// биндим роуты согласно интерфейсу: bindRoutes(routes: IControllerRoute[])
		this.bindRoutes([
			{
				path: '/:id',
				method: 'get',
				func: this.getTicket,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/create',
				method: 'post',
				func: this.createTicket,
				middlewares: [new AuthGuard(), new ValidateMiddleware(TicketCreateDto)],
			},
		]);
	}

	async getTicket({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = params;
		const ticketData = await this.ticketService.getTicket(Number(id));
		this.ok(res, ticketData);
	}

	async createTicket(
		req: Request<{}, {}, TicketCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { body } = req;
		const result = await this.ticketService.createTicket(body);
		this.ok(res, result);
	}
}
