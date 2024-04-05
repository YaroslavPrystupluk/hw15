import { type DataSource } from 'typeorm'
import { type INewspost, type IParam } from '../interface/interface'
import DatabaseConnection from './DatabaseConnection'
import { Newspost } from '../entity'

class Repository {
  private static instance: Repository
  private db: DataSource

  constructor () {
    this.initializeDB()
  }

  private async initializeDB (): Promise<void> {
    this.db = await DatabaseConnection.getDB()
  }

  public static getInstance (): Repository {
    if (!Repository.instance) {
      Repository.instance = new Repository()
    }
    return Repository.instance
  }

  async count (table: string) {
    return await this.db.getRepository(table).count()
  }

  async create (table: string, data: INewspost) {
    return await this.db.getRepository(table).insert(data)
	 }

  async readAll (table: string, params: IParam) {
    return await this.db
      .getRepository(Newspost)
      .createQueryBuilder('newspost')
      .leftJoinAndSelect('newspost.author', 'author')
      .limit(params.size)
      .offset(params.page)
      .getMany()
  }

  async read (table: string, id: number) {
    return await this.db.getRepository(table).findOne({
      relations: ['author'],
      where: {
        id
      }
    })
  }

  async update (table: string, id: number, newData: any) {
    return await this.db.getRepository(table).update(id, newData)
  }

  async delete (table: string, id: number) {
    return await this.db.getRepository(table).delete(id)
  }
}

export default Repository.getInstance()
