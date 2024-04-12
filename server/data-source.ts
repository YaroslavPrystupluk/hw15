/* eslint-disable n/no-path-concat */
import { config } from 'dotenv'
import 'reflect-metadata'

import DatabaseConnection from './repository/DatabaseConnection'

config()

export const AppDataSource = DatabaseConnection.getDB()
