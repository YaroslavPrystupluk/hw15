import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction
} from 'express'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import {
  UsersController,
  MainController,
  NewsController,
  AuthController
} from './controllers'
import Routes from './routers'
import { AuthService } from './services'
import Validator from 'fastest-validator'
import { ValidationError, NewspostsServiceError } from './errors'
import { logger } from './logger/logger'
import passport from 'passport'
import { Strategy } from 'passport-http-bearer'

dotenv.config()
const validatorService = new Validator()

const PORT: number | string = process.env.PORT || 3000
const HOST: string = process.env.HOST || 'localhost'
const CORS_OPTIONS = {
  origin: 'https://newsposts.vercel.app',
  optionsSuccessStatus: 200
}

function logRequest (req: Request, _res: Response, next: NextFunction) {
  logger.info({
    method: req.method,
    url: req.url,
    body: req.body
  })
  next()
}

const validatorMiddleware = (schema: any) => {
  const checkService = validatorService.compile(schema)

  return (req: Request, res: Response, next: NextFunction) => {
    const check: any = checkService(req.body)
    if (check !== true) {
      throw new ValidationError('Validation error', check)
    }

    next()
  }
}

const bearerStrategy = new Strategy(AuthService.auth)

passport.use(bearerStrategy)

class App {
  private readonly app: Application
  private readonly publicPath: string
  private readonly mainController: MainController
  private readonly newsController: NewsController
  private readonly usersController: UsersController
  private readonly authController: AuthController

  constructor () {
    this.app = express()
    this.mainController = new MainController()
    this.newsController = new NewsController()
    this.usersController = new UsersController()
    this.authController = new AuthController()
    this.publicPath = path.join(__dirname, '../client/build')
  }

  private routing (): void {
    this.app.use(express.static(path.join(this.publicPath)))
   //  this.app.get('/', this.mainController.getStartPage)
	this.app.get('/', (req: Request, res: Response) => {
		res.send('Hello World!')
	})

    const createUpdateMiddlewares = [
      validatorMiddleware({
        title: { type: 'string', min: 1, max: 50 },
        text: { type: 'string', min: 1, max: 256 }
      })
    ]

    const createUsersMiddlewares = [
      validatorMiddleware({
        email: { type: 'email', uppercase: true },
        password: { type: 'string', min: 8, max: 255 }
      })
    ]

    this.app.post(
      '/api/newsposts',
      passport.authenticate('bearer', { session: false }),
      createUpdateMiddlewares,
      this.newsController.create
    )

    this.app.put(
      '/api/newsposts/:id',
      createUpdateMiddlewares,
      this.newsController.update
    )
    this.app.post(
      '/api/auth/register',
      createUsersMiddlewares,
      this.usersController.registration
    )
    this.app.post('/api/login', this.authController.login)
    this.app.post('/api/logout', this.authController.logout)

    this.app.get(
      '/api/user',
      passport.authenticate('bearer', { session: false })
    )

    this.app.get(
      '/api/newsposts/error',
      (_req: Request, _res: Response, next: NextFunction) => {
        try {
          throw new NewspostsServiceError('Error occurred in NewspostsService')
        } catch (error) {
          next(error)
        }
      }
    )

    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ValidationError) {
          logger.warn({
            message: err.message,
            errors: err.errors
          })
          res.status(400).json({ message: err.message, errors: err.errors })
        } else {
          logger.error({
            message: err.message,
            stack: err.stack
          })
          res.status(500).json({ message: 'Internal Server Error' })
        }
      }
    )

    Object.keys(Routes).forEach((key: string) => {
      this.app.use(`/api/${key}`, Routes[key])
    })
  }

  initPlugins (): void {
    this.app.use(bodyParser.json())
    this.app.use(morgan('dev'))
    this.app.use(cors(CORS_OPTIONS))
    this.app.use(logRequest)
  }

  async start (): Promise<void> {
    this.initPlugins()
    this.routing()

    this.app.listen(PORT, () => {
      console.log(`Server start: ${HOST}:${PORT}`)
    })
  }
}
const server = new App()
server.start()
