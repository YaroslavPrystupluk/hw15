"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class BaseRouter {
    constructor(controller) {
        this.router = (0, express_1.Router)();
        this.controller = controller;
        this.routes();
    }
    routes() {
        this.router
            .route('/')
            .post(this.controller.create)
            .get(this.controller.getList);
        this.router
            .route('/:id')
            .get(this.controller.getSingle)
            .put(this.controller.update)
            .delete(this.controller.delete);
    }
}
exports.default = BaseRouter;
//# sourceMappingURL=base.routes.js.map