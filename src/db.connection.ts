import {config} from 'dotenv'
config()

const CONNECTION = {
    type: 'postgres',
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	username: process.env.DATABASE_NAME,
	password: process.env.DATABASE_PASS,
	database: process.env.DATABASE_USER,
}

export default CONNECTION;