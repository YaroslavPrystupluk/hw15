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
const typeorm_extension_1 = require("typeorm-extension");
const _1 = require(".");
class MainSeeders {
    run(dataSource, factoryManager) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, typeorm_extension_1.runSeeder)(dataSource, _1.NewspostsSeeders);
        });
    }
}
exports.default = MainSeeders;
//# sourceMappingURL=Main.seeder.js.map