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
exports.AddDeleteColum1712230760652 = void 0;
class AddDeleteColum1712230760652 {
    constructor() {
        this.name = 'AddDeleteColum1712230760652';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "newspost" ADD "deleted" boolean NOT NULL DEFAULT false');
            yield queryRunner.query('ALTER TABLE "user" ADD "deleted" boolean NOT NULL DEFAULT false');
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "user" DROP COLUMN "deleted"');
            yield queryRunner.query('ALTER TABLE "newspost" DROP COLUMN "deleted"');
        });
    }
}
exports.AddDeleteColum1712230760652 = AddDeleteColum1712230760652;
//# sourceMappingURL=1712230760652-add_delete_colum.js.map