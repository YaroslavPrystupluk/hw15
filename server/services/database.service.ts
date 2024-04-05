import {Repository} from "../repository";
import { IParam } from "../interface/interface";


class DatabaseService {
  [x: string]: any;
  private static instance: DatabaseService;

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async count(table: string) {
    return await Repository.count(table);
  }

  async create(table: string, data: any) {
    return await Repository.create(table, data);
  }

  async readAll(table?: string, params?: IParam) {
    return await Repository.readAll(table, params);
  }

  async read(table: string, id: number) {
    return await Repository.read(table, id);
  }

  async update(table: string, id: number, newData: string) {
    return await Repository.update(table, id, newData);
  }

  async delete(table: string, id: number) {
     await Repository.delete(table, id);
  }
 
}

export default DatabaseService.getInstance();
