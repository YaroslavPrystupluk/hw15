"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
/* eslint-disable n/no-path-concat */
var dotenv_1 = require("dotenv");
require("reflect-metadata");
var DatabaseConnection_1 = __importDefault(require("./repository/DatabaseConnection"));
(0, dotenv_1.config)();
exports.AppDataSource = DatabaseConnection_1.default.getDB();
//# sourceMappingURL=data-source.js.map