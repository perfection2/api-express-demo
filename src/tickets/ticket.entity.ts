export class Ticket {
	name: string;
	description: string;
	deadline: Date;
	assignee: number;

	constructor(name: string, description: string, deadline: Date, assignee: number) {
		this.name = name;
		this.description = description;
		this.deadline = deadline;
		this.assignee = assignee;
	}
}
