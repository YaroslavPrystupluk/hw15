"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var BaseRouter = /** @class */ (function () {
    function BaseRouter(controller) {
        this.router = (0, express_1.Router)();
        this.controller = controller;
        this.routes();
    }
    BaseRouter.prototype.routes = function () {
        this.router
            .route('/')
            .post(this.controller.create)
            .get(this.controller.getList);
        this.router
            .route('/:id')
            .get(this.controller.getSingle)
            .put(this.controller.update)
            .delete(this.controller.delete);
    };
    return BaseRouter;
}());
exports.default = BaseRouter;
//# sourceMappingURL=base.routes.js.map