"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = __importDefault(require("winston"));
var path_1 = __importDefault(require("path"));
var _a = winston_1.default.format, combine = _a.combine, timestamp = _a.timestamp, json = _a.json, prettyPrint = _a.prettyPrint, errors = _a.errors;
exports.logger = winston_1.default.createLogger({
    level: 'info',
    format: combine(errors({ stack: true }), timestamp(), json(), prettyPrint()),
    transports: [
        //  new winston.transports.Console(),
        new winston_1.default.transports.File({ filename: path_1.default.join(__dirname, "../logs/".concat(new Date().toISOString().slice(0, 10), ".log")) })
    ]
});
//# sourceMappingURL=logger.js.map