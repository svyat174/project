module.exports = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'Dfcz2019',
	database: 'postgres',
	entities: ['dist/**/*.entity.js'],
	migrations: ['dist/migrations/*.js'],
	cli: {
		migrationsDir: 'src/migrations'
	}
}