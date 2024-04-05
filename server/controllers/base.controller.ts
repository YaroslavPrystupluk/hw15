import { Request, Response } from "express";
import { DatabaseService } from "../services";


export class BaseController {
  private table: string;

  constructor(table: string) {
    this.table = table;

    this.create = this.create.bind(this);
    this.getList = this.getList.bind(this);
    this.getSingle = this.getSingle.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req: Request, res: Response) {
    try {
	const {user} = req;
	req.body = {...req.body, author: user};

      const data = await DatabaseService.create(this.table, req.body);

      res.status(201);
      res.json({ message: `${this.table} created`, data });
    } catch (error) {
      res.status(500);
      res.json({ message: `Error creating ${this.table}` });
    }
  }

  async getList(req: Request, res: Response) {
    try {

      const size = Number(req.query.size) || 10;
      const page = Number(req.query.page) || 0;

      const items = await DatabaseService.readAll(this.table, {
        size,
        page,
      });

      const count = await DatabaseService.count(this.table);
      const maxPagesCount = Math.ceil(count / size);

      res.status(200);
      res.json({
        data: {
          items,
          maxPagesCount,
        },
      });
    } catch (error) {
      res.status(404);
      res.json({ message: `${this.table} not exists` });
    }
  }
  async getSingle(req: Request, res: Response) {
    try {
      const data = await DatabaseService.read(
        this.table,
        Number(req.params.id)
      );
      if (data) {
        res.status(200);
        res.json({ data, message: `${this.table} read` });
      } else {
        res.status(404);
        res.json({ message: `${this.table} not founded` });
      }
    } catch (error) {
      res.status(500);
      res.json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const existingData = await DatabaseService.read(this.table, id);

      if (!existingData) {
        res.status(404);
        return res.json({ message: `${this.table} with id ${id} not found` });
      }

      await DatabaseService.update(this.table, Number(req.params.id), req.body);
      res.status(200);
      res.json({ updatedData: req.body, message: `${this.table} updated` });
    } catch (error) {
      res.status(500);
      throw new Error(`Error updating ${this.table}`);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const existingData = await DatabaseService.read(this.table, id);

      if (!existingData) {
        res.status(404);
        return res.json({ message: `${this.table} with id ${id} not found` });
      }

      await DatabaseService.delete(this.table, Number(req.params.id));
      res.status(200);
      res.json({ message: `${this.table} was  removed` });
    } catch (error) {
      res.status(500);
      throw new Error(`Error removing ${this.table}`);
    }
  }
}
