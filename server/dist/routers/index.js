"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const news_routes_1 = __importDefault(require("./news.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const Routes = {
    newsposts: news_routes_1.default,
    user: user_routes_1.default
};
exports.default = Routes;
//# sourceMappingURL=index.js.map