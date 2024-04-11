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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseConnection_1 = __importDefault(require("./DatabaseConnection"));
const entity_1 = require("../entity");
class Repository {
    constructor() {
        this.initializeDB();
    }
    initializeDB() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield DatabaseConnection_1.default.getDB();
        });
    }
    static getInstance() {
        if (!Repository.instance) {
            Repository.instance = new Repository();
        }
        return Repository.instance;
    }
    count(table) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.getRepository(table).count();
        });
    }
    create(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.getRepository(table).insert(data);
        });
    }
    readAll(table, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db
                .getRepository(entity_1.Newspost)
                .createQueryBuilder('newspost')
                .leftJoinAndSelect('newspost.author', 'author')
                .limit(params.size)
                .offset(params.page)
                .getMany();
        });
    }
    read(table, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.getRepository(table).findOne({
                relations: ['author'],
                where: {
                    id
                }
            });
        });
    }
    update(table, id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.getRepository(table).update(id, newData);
        });
    }
    delete(table, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.getRepository(table).delete(id);
        });
    }
}
exports.default = Repository.getInstance();
//# sourceMappingURL=Repository.js.map