/* eslint-disable eol-last */
import { DataSource, type DataSourceOptions } from 'typeorm'
import { type SeederOptions } from 'typeorm-extension'
import { config } from 'dotenv'
import 'reflect-metadata'
import { userFactory, newpostsFactory } from '../factories'
import { Newspost, User } from '../entity'
import { MainSeeders } from '../seeds'
import path from 'path'

config()

class DatabaseConnection {
  private static readonly instance: DatabaseConnection
  private readonly options: DataSourceOptions & SeederOptions
  private readonly db: DataSource
  private constructor () {
    this.options = {
      type: 'postgres',
      url: process.env.DB_URL,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: false,
      factories: [userFactory, newpostsFactory],
      entities: [User, Newspost],
      migrations: [path.join(__dirname, '..', 'migrations/*.{ts,js}')],
      seeds: [MainSeeders],
      subscribers: []
    }
    this.db = new DataSource(this.options)
    this.db.initialize()

    console.log('Data Source has been initialized!')
  }

  public static getInstance (): DatabaseConnection {
    return DatabaseConnection.instance ? DatabaseConnection.instance : new DatabaseConnection()
  }

  public async getDB () {
    return this.db
  }
}

export default DatabaseConnection.getInstance()