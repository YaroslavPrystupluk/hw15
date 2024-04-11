"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var news_routes_1 = __importDefault(require("./news.routes"));
var user_routes_1 = __importDefault(require("./user.routes"));
var Routes = {
    newsposts: news_routes_1.default,
    user: user_routes_1.default
};
exports.default = Routes;
//# sourceMappingURL=index.js.map