"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_extension_1 = require("typeorm-extension");
var crypto_1 = __importDefault(require("crypto"));
var entity_1 = require("../entity");
exports.default = (0, typeorm_extension_1.setSeederFactory)(entity_1.User, function (faker) {
    var password = crypto_1.default.createHash('sha256').update('password').digest('hex');
    var user = new entity_1.User();
    user.email = faker.internet.email();
    user.password = faker.internet.password(password);
    return user;
});
//# sourceMappingURL=user.factory.js.map