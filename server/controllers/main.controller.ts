import { Request, Response } from 'express'
import path from 'path';

export class MainController {
	private publicPath: string;

  constructor() {
    this.publicPath = path.join(__dirname, "../../client/build");
  }
	getStartPage(req: Request, res: Response){
      res.sendFile(path.join(this.publicPath, "index.html"));
    };
} 