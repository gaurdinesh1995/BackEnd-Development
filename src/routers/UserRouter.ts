import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserValidator } from "../validators/UserValidator";

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.deleteRoutes();
  }
  getRoutes() {
  
  }
  postRoutes() {
    this.router.post("/login",UserValidator.login(), UserController.login)
  }
  patchRoutes() {}
  deleteRoutes() {}
}
export default new UserRouter().router;
