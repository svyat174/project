import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'Dfcz2019',
	database: 'postgres',
	entities: ['dist/**/*.entity.js'],
	migrations: ['dist/migrations/*.js'],
	
}

export default config