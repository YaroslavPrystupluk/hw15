import { NewsController } from '../controllers'
import BaseRouter from './base.routes'

class NewsRouter extends BaseRouter {
  constructor () {
    super(new NewsController())
  }
}

const { router } = new NewsRouter()

export default router
