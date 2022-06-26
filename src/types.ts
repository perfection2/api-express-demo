// исрользуем символы, тк они уникальны

export const TYPES = {
	Applications: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'),
	UserController: Symbol.for('UserController'),
	UserService: Symbol.for('UserService'),
	ExceptionFilter: Symbol.for('ExceptionFilter'),
	ConfigService: Symbol.for('ConfigService'),
	PrismaService: Symbol.for('PrismaService'),
	UsersRepository: Symbol.for('UsersRepository'),
	TicketRepository: Symbol.for('TicketRepository'),
	TicketService: Symbol.for('TicketService'),
	TicketController: Symbol.for('TicketController'),
};
