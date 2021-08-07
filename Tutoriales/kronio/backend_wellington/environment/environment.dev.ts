import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

const ormconfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'hola1234',
	database: 'Takion',
	synchronize: true,
};

export const environment = {
	SECRET_KEY: 'a very complex secret key',
	JWT_EXPIRATION: 60 * 60,
	MAILER_TRANSPORT: {
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: 'takion.software@gmail.com',
			pass: 'GMjBbP3cyo6m',
		},
	},
	ormconfig,
};
