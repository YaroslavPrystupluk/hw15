import { UsersController } from "../controllers";
import BaseRouter from "./base.routes";

class UserRouter extends BaseRouter {
  constructor() {
    super(new UsersController());
  }
}

const { router } = new UserRouter();

export default router;
