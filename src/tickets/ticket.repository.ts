import { ITicketRepository } from './ticket.repository.interface';
import { Ticket } from './ticket.entity';
import { TicketModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';

@injectable()
export class TicketRepository implements ITicketRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create(ticket: Ticket): Promise<TicketModel> {
		const { name, description, deadline, assignee } = ticket;
		return this.prismaService.client.ticketModel.create({
			data: {
				name,
				description,
				deadline,
				assigneeId: assignee,
			},
		});
	}

	async find(id: number): Promise<TicketModel | null> {
		return this.prismaService.client.ticketModel.findFirst({
			where: { id },
		});
	}
}
