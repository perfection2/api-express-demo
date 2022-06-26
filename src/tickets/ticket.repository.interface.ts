import { TicketModel } from '@prisma/client';
import { Ticket } from './ticket.entity';

export interface ITicketRepository {
	create: (ticket: Ticket) => Promise<TicketModel>;
	find: (id: number) => Promise<TicketModel | null>;
}
