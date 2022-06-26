import { ITicketService } from './ticket.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ITicketRepository } from './ticket.repository.interface';
import { TicketCreateDto } from './dto/ticket-create.dto';
import { TicketModel } from '@prisma/client';
import { Ticket } from './ticket.entity';

@injectable()
export class TicketService implements ITicketService {
	constructor(@inject(TYPES.TicketRepository) private ticketRepository: ITicketRepository) {}

	async getTicket(id: number): Promise<TicketModel | null> {
		return this.ticketRepository.find(id);
	}

	async createTicket({
		name,
		description,
		deadline,
		assignee,
	}: TicketCreateDto): Promise<TicketModel> {
		const newTicket = new Ticket(name, description, deadline, assignee);
		return this.ticketRepository.create(newTicket);
	}
}
