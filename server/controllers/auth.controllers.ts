import { type Request, type Response } from 'express'
import authService from '../services/auth.service'

class AuthController {
  async logout (req: Request, res: Response) {
    try {
      res.send({ message: 'Logout successful' })
    } catch (error) {
      console.error('Error logging out:', error)
      res.status(500).json({ message: 'Error logging out' })
    }
  }

  async login (req: Request, res: Response) {
    try {
      const { email: userEmail, password } = req.body

      const foundUser = await authService.getUserByEmail(userEmail)

      if (!foundUser) {
        return res.status(404).json({ message: 'User not found' })
      }
      const isPasswordValid = await authService.comparePasswords(
        password,
        foundUser.password
      )

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' })
      }
      const token = await authService.generateToken(userEmail, password)
      return res.send({ token })
    } catch (error) {
      console.error('Error logging in:', error)
      res.status(500).json({ message: 'Error logging in' })
    }
  }
}

export { AuthController }
