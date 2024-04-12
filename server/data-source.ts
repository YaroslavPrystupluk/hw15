/* eslint-disable n/no-path-concat */
import { DataSource, type DataSourceOptions } from 'typeorm'
import { type SeederOptions } from 'typeorm-extension'
import { config } from 'dotenv'
import 'reflect-metadata'
import { Newspost, User } from './entity'
import { MainSeeders } from './seeds'
import { userFactory, newpostsFactory } from './factories'

config()

const path = `${__dirname}`
console.log(path)

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Newspost],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  migrationsRun: false,
  seeds: [MainSeeders],
  factories: [userFactory, newpostsFactory],
  subscribers: []
}

export const AppDataSource = new DataSource(options)
