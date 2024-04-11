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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var controllers_1 = require("./controllers");
var routers_1 = __importDefault(require("./routers"));
var services_1 = require("./services");
var fastest_validator_1 = __importDefault(require("fastest-validator"));
var errors_1 = require("./errors");
var logger_1 = require("./logger/logger");
var passport_1 = __importDefault(require("passport"));
var passport_http_bearer_1 = require("passport-http-bearer");
dotenv_1.default.config();
var validatorService = new fastest_validator_1.default();
var PORT = process.env.PORT || 3000;
var HOST = process.env.HOST || 'localhost';
var CORS_OPTIONS = {
    origin: '*',
    optionsSuccessStatus: 200
};
function logRequest(req, _res, next) {
    logger_1.logger.info({
        method: req.method,
        url: req.url,
        body: req.body
    });
    next();
}
var validatorMiddleware = function (schema) {
    var checkService = validatorService.compile(schema);
    return function (req, res, next) {
        var check = checkService(req.body);
        if (check !== true) {
            throw new errors_1.ValidationError('Validation error', check);
        }
        next();
    };
};
var bearerStrategy = new passport_http_bearer_1.Strategy(services_1.AuthService.auth);
passport_1.default.use(bearerStrategy);
var App = /** @class */ (function () {
    function App() {
        this.app = (0, express_1.default)();
        this.mainController = new controllers_1.MainController();
        this.newsController = new controllers_1.NewsController();
        this.usersController = new controllers_1.UsersController();
        this.authController = new controllers_1.AuthController();
        this.publicPath = path_1.default.join(__dirname, '../client/build');
    }
    App.prototype.routing = function () {
        var _this = this;
        this.app.use(express_1.default.static(path_1.default.join(this.publicPath)));
        //  this.app.get('/', this.mainController.getStartPage)
        this.app.get('/', function (req, res) {
            res.send('Hello World!');
        });
        var createUpdateMiddlewares = [
            validatorMiddleware({
                title: { type: 'string', min: 1, max: 50 },
                text: { type: 'string', min: 1, max: 256 }
            })
        ];
        var createUsersMiddlewares = [
            validatorMiddleware({
                email: { type: 'email', uppercase: true },
                password: { type: 'string', min: 8, max: 255 }
            })
        ];
        this.app.post('/api/newsposts', passport_1.default.authenticate('bearer', { session: false }), createUpdateMiddlewares, this.newsController.create);
        this.app.put('/api/newsposts/:id', createUpdateMiddlewares, this.newsController.update);
        this.app.post('/api/auth/register', createUsersMiddlewares, this.usersController.registration);
        this.app.post('/api/login', this.authController.login);
        this.app.post('/api/logout', this.authController.logout);
        this.app.get('/api/user', passport_1.default.authenticate('bearer', { session: false }));
        this.app.get('/api/newsposts/error', function (_req, _res, next) {
            try {
                throw new errors_1.NewspostsServiceError('Error occurred in NewspostsService');
            }
            catch (error) {
                next(error);
            }
        });
        this.app.use(function (err, req, res, next) {
            if (err instanceof errors_1.ValidationError) {
                logger_1.logger.warn({
                    message: err.message,
                    errors: err.errors
                });
                res.status(400).json({ message: err.message, errors: err.errors });
            }
            else {
                logger_1.logger.error({
                    message: err.message,
                    stack: err.stack
                });
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
        Object.keys(routers_1.default).forEach(function (key) {
            _this.app.use("/api/".concat(key), routers_1.default[key]);
        });
    };
    App.prototype.initPlugins = function () {
        this.app.use(body_parser_1.default.json());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)(CORS_OPTIONS));
        this.app.use(logRequest);
    };
    App.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.initPlugins();
                this.routing();
                this.app.listen(PORT, function () {
                    console.log("Server start: ".concat(HOST, ":").concat(PORT));
                });
                return [2 /*return*/];
            });
        });
    };
    return App;
}());
var server = new App();
server.start();
//# sourceMappingURL=server.js.map