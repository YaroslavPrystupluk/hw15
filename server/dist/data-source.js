"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
/* eslint-disable n/no-path-concat */
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
require("reflect-metadata");
const entity_1 = require("./entity");
const seeds_1 = require("./seeds");
const factories_1 = require("./factories");
(0, dotenv_1.config)();
const path = `${__dirname}`;
console.log(path);
const options = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [entity_1.User, entity_1.Newspost],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    migrationsRun: false,
    seeds: [seeds_1.MainSeeders],
    factories: [factories_1.userFactory, factories_1.newpostsFactory],
    subscribers: []
};
exports.AppDataSource = new typeorm_1.DataSource(options);
//# sourceMappingURL=data-source.js.map