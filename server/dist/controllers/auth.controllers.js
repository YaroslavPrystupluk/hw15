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
exports.AuthController = void 0;
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthController {
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.send({ message: 'Logout successful' });
            }
            catch (error) {
                console.error('Error logging out:', error);
                res.status(500).json({ message: 'Error logging out' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email: userEmail, password } = req.body;
                const foundUser = yield auth_service_1.default.getUserByEmail(userEmail);
                if (!foundUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
                const isPasswordValid = yield auth_service_1.default.comparePasswords(password, foundUser.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid password' });
                }
                const token = yield auth_service_1.default.generateToken(userEmail, password);
                return res.send({ token });
            }
            catch (error) {
                console.error('Error logging in:', error);
                res.status(500).json({ message: 'Error logging in' });
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controllers.js.map