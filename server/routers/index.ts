import { Router } from "express";
import NewsRoute from "./news.routes";
import UserRoute from "./user.routes";

interface IRouter {
  [key: string]: Router;
}

const Routes: IRouter = {
  newsposts: NewsRoute,
  user: UserRoute,
};

export default Routes;
