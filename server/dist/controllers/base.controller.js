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
exports.BaseController = void 0;
const services_1 = require("../services");
class BaseController {
    constructor(table) {
        this.table = table;
        this.create = this.create.bind(this);
        this.getList = this.getList.bind(this);
        this.getSingle = this.getSingle.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = req;
                req.body = Object.assign(Object.assign({}, req.body), { author: user });
                const data = yield services_1.DatabaseService.create(this.table, req.body);
                res.status(201);
                res.json({ message: `${this.table} created`, data });
            }
            catch (error) {
                res.status(500);
                res.json({ message: `Error creating ${this.table}` });
            }
        });
    }
    getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const size = Number(req.query.size) || 10;
                const page = Number(req.query.page) || 0;
                const items = yield services_1.DatabaseService.readAll(this.table, {
                    size,
                    page
                });
                const count = yield services_1.DatabaseService.count(this.table);
                const maxPagesCount = Math.ceil(count / size);
                res.status(200);
                res.json({
                    data: {
                        items,
                        maxPagesCount
                    }
                });
            }
            catch (error) {
                res.status(404);
                res.json({ message: `${this.table} not exists` });
            }
        });
    }
    getSingle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield services_1.DatabaseService.read(this.table, Number(req.params.id));
                if (data) {
                    res.status(200);
                    res.json({ data, message: `${this.table} read` });
                }
                else {
                    res.status(404);
                    res.json({ message: `${this.table} not founded` });
                }
            }
            catch (error) {
                res.status(500);
                res.json({ message: 'Internal server error' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const existingData = yield services_1.DatabaseService.read(this.table, id);
                if (!existingData) {
                    res.status(404);
                    return res.json({ message: `${this.table} with id ${id} not found` });
                }
                yield services_1.DatabaseService.update(this.table, Number(req.params.id), req.body);
                res.status(200);
                res.json({ updatedData: req.body, message: `${this.table} updated` });
            }
            catch (error) {
                res.status(500);
                throw new Error(`Error updating ${this.table}`);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const existingData = yield services_1.DatabaseService.read(this.table, id);
                if (!existingData) {
                    res.status(404);
                    return res.json({ message: `${this.table} with id ${id} not found` });
                }
                yield services_1.DatabaseService.delete(this.table, Number(req.params.id));
                res.status(200);
                res.json({ message: `${this.table} was  removed` });
            }
            catch (error) {
                res.status(500);
                throw new Error(`Error removing ${this.table}`);
            }
        });
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map