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
const repository_1 = require("../repository");
class DatabaseService {
    static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }
    count(table) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield repository_1.Repository.count(table);
        });
    }
    create(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield repository_1.Repository.create(table, data);
        });
    }
    readAll(table, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield repository_1.Repository.readAll(table, params);
        });
    }
    read(table, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield repository_1.Repository.read(table, id);
        });
    }
    update(table, id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield repository_1.Repository.update(table, id, newData);
        });
    }
    delete(table, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield repository_1.Repository.delete(table, id);
        });
    }
}
exports.default = DatabaseService.getInstance();
//# sourceMappingURL=database.service.js.map