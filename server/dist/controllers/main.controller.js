"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const path_1 = __importDefault(require("path"));
class MainController {
    constructor() {
        this.publicPath = path_1.default.join(__dirname, '../../client/build');
    }
    getStartPage(req, res) {
        res.sendFile(path_1.default.join(this.publicPath, 'index.html'));
    }
    ;
}
exports.MainController = MainController;
//# sourceMappingURL=main.controller.js.map