import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'postgres',
	entities: ['dist/src/**/**/*.entity.js'],
	migrations: ['dist/src/migrations/*.js'],
}

export default config