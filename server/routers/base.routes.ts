import { Router } from "express";
import { BaseController } from "../controllers";

class BaseRouter {
  public router: Router;
  private controller: BaseController;

  constructor(controller: BaseController) {
    this.router = Router();
    this.controller = controller;

    this.routes();
  }

  routes() {
    this.router
      .route("/")
      .post(this.controller.create)
      .get(this.controller.getList);

    this.router
      .route("/:id")
      .get(this.controller.getSingle)
      .put(this.controller.update)
      .delete(this.controller.delete);
  }
}

export default BaseRouter;
