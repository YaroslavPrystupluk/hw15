"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable eol-last */
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
require("reflect-metadata");
const factories_1 = require("../factories");
const entity_1 = require("../entity");
const seeds_1 = require("../seeds");
(0, dotenv_1.config)();
class DatabaseConnection {
    constructor() {
        this.options = {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            logging: false,
            factories: [factories_1.userFactory, factories_1.newpostsFactory],
            entities: [entity_1.User, entity_1.Newspost],
            migrations: [],
            seeds: [seeds_1.MainSeeders],
            subscribers: []
        };
        this.db = new typeorm_1.DataSource(this.options);
        this.db.initialize();
    }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    getDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.db.isInitialized) {
                    return this.db;
                }
                console.log('Data Source has been initialized!');
            }
            catch (err) {
                console.error('Error during Data Source initialization', err);
            }
            return this.db;
        });
    }
}
exports.default = DatabaseConnection.getInstance();
//# sourceMappingURL=DatabaseConnection.js.map