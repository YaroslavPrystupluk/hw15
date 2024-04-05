import { Router } from 'express'
import { type BaseController } from '../controllers'

class BaseRouter {
  public router: Router
  private readonly controller: BaseController

  constructor (controller: BaseController) {
    this.router = Router()
    this.controller = controller

    this.routes()
  }

  routes () {
    this.router
      .route('/')
      .post(this.controller.create)
      .get(this.controller.getList)

    this.router
      .route('/:id')
      .get(this.controller.getSingle)
      .put(this.controller.update)
      .delete(this.controller.delete)
  }
}

export default BaseRouter
