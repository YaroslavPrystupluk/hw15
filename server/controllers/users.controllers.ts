import { type Request, type Response } from 'express'
import { AuthService, DatabaseService } from '../services'
import { BaseController } from './base.controller'

export class UsersController extends BaseController {
  constructor () {
    super('user')
  }

  async registration (req: Request, res: Response) {
    try {
      const { password, confirmPassword } = req.body

      if (password !== confirmPassword) {
        res.status(400)
        return res.json({ message: 'Passwords do not match' })
      }

      const user = await AuthService.getUserByEmail(req.body.email)
      if (user) {
        res.status(400)
        return res.json({ message: 'User already exists' })
      }

      req.body.email = req.body.email.toLowerCase()
      req.body.password = AuthService.hash(password)

      const data = await DatabaseService.create('user', req.body)

		res.status(201)
      res.json({ message: 'user created', data })
    } catch (error) {
      res.status(500)
      res.json({ message: 'Error creating user' })
    }
  }
}
