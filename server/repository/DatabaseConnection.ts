/* eslint-disable eol-last */
import { DataSource, type DataSourceOptions } from 'typeorm'
import { type SeederOptions } from 'typeorm-extension'
import { config } from 'dotenv'
import 'reflect-metadata'
import { userFactory, newpostsFactory } from '../factories'
import { Newspost, User } from '../entity'
import { MainSeeders } from '../seeds'

config()

class DatabaseConnection {
  private static instance: DatabaseConnection
  private readonly options: DataSourceOptions & SeederOptions
  private readonly db: DataSource
  private constructor () {
    this.options = {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'rootroot',
      database: process.env.DB_NAME || 'typeorm',
      synchronize: true,
      logging: false,
      factories: [userFactory, newpostsFactory],
      entities: [User, Newspost],
      migrations: [],
      seeds: [MainSeeders],
      subscribers: []
    }
    this.db = new DataSource(this.options)

    this.db.initialize()
  }

  public static getInstance (): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  public async getDB () {
    try {
      if (this.db.isInitialized) {
        return this.db
      }
      console.log('Data Source has been initialized!')
    } catch (err) {
      console.error('Error during Data Source initialization', err)
    }
    return this.db
  }
}

export default DatabaseConnection.getInstance()