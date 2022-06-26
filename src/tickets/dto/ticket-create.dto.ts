import { IsDateString, IsNumber, IsString } from 'class-validator';

export class TicketCreateDto {
	@IsString({ message: 'Некорректное наименование заявки' })
	name: string;

	@IsString({ message: 'Некорректное описание заявки' })
	description: string;

	@IsDateString({ message: 'Некорректный дедлайн заявки' })
	deadline: Date;

	@IsNumber()
	assignee: number;
}
