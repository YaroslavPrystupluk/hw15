"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const base_routes_1 = __importDefault(require("./base.routes"));
class UserRouter extends base_routes_1.default {
    constructor() {
        super(new controllers_1.UsersController());
    }
}
const { router } = new UserRouter();
exports.default = router;
//# sourceMappingURL=user.routes.js.map