import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { config } from "dotenv";
import "reflect-metadata";
import { Newspost, User } from "./entity";
import { MainSeeders } from "./seeds";
import { userFactory, newpostsFactory } from "./factories";

config();

const path = `${__dirname}`;
console.log(path);



const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "rootroot",
  database: process.env.DB_NAME || "typeorm",
  synchronize: true,
  logging: true,
  entities: [User, Newspost],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  migrationsRun: false,
  seeds: [MainSeeders],
  factories: [userFactory, newpostsFactory],
  subscribers: [],
};

export const AppDataSource = new DataSource(options);
