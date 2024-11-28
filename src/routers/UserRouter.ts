import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserValidator } from "../validators/UserValidator";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";

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
    this.router.get(
      "/send/verification/email",
      UserValidator.resendVerificationEmail(),
      GlobalMiddleWare.checkError,
      UserController.resendVerificationEmail
    );
    this.router.get(
      "/login",
      UserValidator.login(),
      GlobalMiddleWare.checkError,
      UserController.login
    );
  }
  postRoutes() {
    this.router.post(
      "/signup",
      UserValidator.signUp(),
      GlobalMiddleWare.checkError,
      UserController.signUp
    );
  }
  patchRoutes() {
    this.router.patch(
      "/verify",
      UserValidator.verifyUser(),
      GlobalMiddleWare.checkError,
      UserController.verify
    );
  }
  deleteRoutes() {}
}
export default new UserRouter().router;
