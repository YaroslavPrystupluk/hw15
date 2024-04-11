"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const crypto_1 = __importDefault(require("crypto"));
const entity_1 = require("../entity");
exports.default = (0, typeorm_extension_1.setSeederFactory)(entity_1.User, (faker) => {
    const password = crypto_1.default.createHash('sha256').update('password').digest('hex');
    const user = new entity_1.User();
    user.email = faker.internet.email();
    user.password = faker.internet.password(password);
    return user;
});
//# sourceMappingURL=user.factory.js.map