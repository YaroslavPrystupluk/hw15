import { type Router } from 'express'
import NewsRoute from './news.routes'
import UserRoute from './user.routes'

type IRouter = Record<string, Router>

const Routes: IRouter = {
  newsposts: NewsRoute,
  user: UserRoute
}

export default Routes
