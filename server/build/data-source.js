"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
/* eslint-disable n/no-path-concat */
var typeorm_1 = require("typeorm");
var dotenv_1 = require("dotenv");
require("reflect-metadata");
var entity_1 = require("./entity");
var seeds_1 = require("./seeds");
var factories_1 = require("./factories");
(0, dotenv_1.config)();
var path = "".concat(__dirname);
console.log(path);
var options = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [entity_1.User, entity_1.Newspost],
    migrations: ["".concat(__dirname, "/**/migrations/*.{ts,js}")],
    migrationsRun: false,
    seeds: [seeds_1.MainSeeders],
    factories: [factories_1.userFactory, factories_1.newpostsFactory],
    subscribers: []
};
exports.AppDataSource = new typeorm_1.DataSource(options);
//# sourceMappingURL=data-source.js.map