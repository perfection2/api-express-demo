import { TicketCreateDto } from './dto/ticket-create.dto';
import { TicketModel } from '@prisma/client';

export interface ITicketService {
	getTicket: (id: number) => Promise<TicketModel | null>;
	createTicket: (dto: TicketCreateDto) => Promise<TicketModel>;
}
