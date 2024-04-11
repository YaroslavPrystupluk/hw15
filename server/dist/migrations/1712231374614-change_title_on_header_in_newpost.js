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
exports.ChangeTitleOnHeaderInNewpost1712231374614 = void 0;
class ChangeTitleOnHeaderInNewpost1712231374614 {
    constructor() {
        this.name = 'ChangeTitleOnHeaderInNewpost1712231374614';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "newspost" RENAME COLUMN "title" TO "header"');
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "newspost" RENAME COLUMN "header" TO "title"');
        });
    }
}
exports.ChangeTitleOnHeaderInNewpost1712231374614 = ChangeTitleOnHeaderInNewpost1712231374614;
//# sourceMappingURL=1712231374614-change_title_on_header_in_newpost.js.map