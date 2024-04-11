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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../repository");
const crypto_1 = __importDefault(require("crypto"));
const entity_1 = require("../entity");
class AuthRepository {
    constructor() {
        this.auth = (token, done) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                done(new Error('Token not provided'));
                return;
            }
            try {
                const unHashedToken = Buffer.from(token, 'base64').toString('utf-8');
                let [email, password] = unHashedToken.split(':');
                password = this.hash(password);
                const err = null;
                const user = yield this.db
                    .getRepository(entity_1.User)
                    .createQueryBuilder('user')
                    .where('user.email = :email', { email })
                    .getOne();
                if (err) {
                    done(err);
                    return;
                }
                if (!user) {
                    done(null, false);
                    return;
                }
                if (user.password !== password) {
                    done(null, false);
                    return;
                }
                console.log(user);
                done(null, user);
            }
            catch (error) {
                done(error);
            }
        });
        this.initializeDB();
    }
    initializeDB() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield repository_1.DatabaseConnection.getDB();
        });
    }
    hash(password) {
        return crypto_1.default.createHash('sha256').update(password).digest('hex');
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db
                .getRepository(entity_1.User)
                .createQueryBuilder('user')
                .where('user.email = :email', { email })
                .getOne();
        });
    }
    comparePasswords(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.hash(password) === hashedPassword;
        });
    }
    generateToken(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = process.env.SALT || '12345';
            const unHashedToken = `${email}:${password}:${salt}`;
            const hash = Buffer.from(unHashedToken).toString('base64');
            return hash;
        });
    }
    static getInstance() {
        if (!AuthRepository.instance) {
            AuthRepository.instance = new AuthRepository();
        }
        return AuthRepository.instance;
    }
}
exports.default = AuthRepository.getInstance();
//# sourceMappingURL=auth.service.js.map