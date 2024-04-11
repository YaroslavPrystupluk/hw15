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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const controllers_1 = require("./controllers");
const routers_1 = __importDefault(require("./routers"));
const services_1 = require("./services");
const fastest_validator_1 = __importDefault(require("fastest-validator"));
const errors_1 = require("./errors");
const logger_1 = require("./logger/logger");
const passport_1 = __importDefault(require("passport"));
const passport_http_bearer_1 = require("passport-http-bearer");
dotenv_1.default.config();
const validatorService = new fastest_validator_1.default();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const CORS_OPTIONS = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};
function logRequest(req, _res, next) {
    logger_1.logger.info({
        method: req.method,
        url: req.url,
        body: req.body
    });
    next();
}
const validatorMiddleware = (schema) => {
    const checkService = validatorService.compile(schema);
    return (req, res, next) => {
        const check = checkService(req.body);
        if (check !== true) {
            throw new errors_1.ValidationError('Validation error', check);
        }
        next();
    };
};
const bearerStrategy = new passport_http_bearer_1.Strategy(services_1.AuthService.auth);
passport_1.default.use(bearerStrategy);
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.mainController = new controllers_1.MainController();
        this.newsController = new controllers_1.NewsController();
        this.usersController = new controllers_1.UsersController();
        this.authController = new controllers_1.AuthController();
        this.publicPath = path_1.default.join(__dirname, '../client/build');
    }
    routing() {
        this.app.use(express_1.default.static(path_1.default.join(this.publicPath)));
        //  this.app.get('/', this.mainController.getStartPage)
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        });
        const createUpdateMiddlewares = [
            validatorMiddleware({
                title: { type: 'string', min: 1, max: 50 },
                text: { type: 'string', min: 1, max: 256 }
            })
        ];
        const createUsersMiddlewares = [
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
        this.app.get('/api/newsposts/error', (_req, _res, next) => {
            try {
                throw new errors_1.NewspostsServiceError('Error occurred in NewspostsService');
            }
            catch (error) {
                next(error);
            }
        });
        this.app.options('', (0, cors_1.default)(CORS_OPTIONS));
        this.app.use((err, req, res, next) => {
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
        Object.keys(routers_1.default).forEach((key) => {
            this.app.use(`/api/${key}`, routers_1.default[key]);
        });
    }
    initPlugins() {
        this.app.use(body_parser_1.default.json());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)(CORS_OPTIONS));
        this.app.use(logRequest);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.initPlugins();
            this.routing();
            this.app.listen(PORT, () => {
                console.log(`Server start: ${HOST}:${PORT}`);
            });
        });
    }
}
const server = new App();
server.start();
//# sourceMappingURL=server.js.map