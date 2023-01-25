import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'postgres',
	entities: ['dist/**/*.entity.js'],
	migrations: ['dist/migrations/*.js'],
}

export default config