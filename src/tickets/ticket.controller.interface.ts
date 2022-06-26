import { NextFunction, Request, Response } from 'express';

export class ITicketController {
	getTicket: (req: Request, res: Response, next: NextFunction) => void;
	createTicket: (req: Request, res: Response, next: NextFunction) => void;
}
