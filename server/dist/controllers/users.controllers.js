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
exports.UsersController = void 0;
const services_1 = require("../services");
const base_controller_1 = require("./base.controller");
class UsersController extends base_controller_1.BaseController {
    constructor() {
        super('user');
    }
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, confirmPassword } = req.body;
                if (password !== confirmPassword) {
                    res.status(400);
                    return res.json({ message: 'Passwords do not match' });
                }
                const user = yield services_1.AuthService.getUserByEmail(req.body.email);
                if (user) {
                    res.status(400);
                    return res.json({ message: 'User already exists' });
                }
                req.body.email = req.body.email.toLowerCase();
                req.body.password = services_1.AuthService.hash(password);
                const data = yield services_1.DatabaseService.create('user', req.body);
                res.status(201);
                res.json({ message: 'user created', data });
            }
            catch (error) {
                res.status(500);
                res.json({ message: 'Error creating user' });
            }
        });
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controllers.js.map