import { type Request, type Response } from 'express'
import path from 'path'

export class MainController {
  private readonly publicPath: string

  constructor () {
    this.publicPath = path.join(__dirname, '../../client/build')
  }

  getStartPage (req: Request, res: Response) {
    res.sendFile(path.join(this.publicPath, 'index.html'))
  };
}
