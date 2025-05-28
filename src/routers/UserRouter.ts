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
    this.router.get("/send/verification/email",GlobalMiddleWare.authenticate,UserController.resendVerificationEmail );
    this.router.get("/login",UserValidator.login(),GlobalMiddleWare.checkError,UserController.login);
    this.router.get("/reset/passwordEmail",UserValidator.sendResetPasswordEmail(),GlobalMiddleWare.checkError,UserController.sendResetPasswordEmail);
    this.router.get("/verify/resetPasswordToken",UserValidator.verifyResetPasswordToken(),GlobalMiddleWare.checkError,UserController.verifyResetPasswordToken)
  }
  postRoutes() {
    this.router.post("/signup",UserValidator.signUp(),GlobalMiddleWare.checkError,UserController.signUp);
  }
  patchRoutes() {
    this.router.patch("/verify",UserValidator.verifyUser(),GlobalMiddleWare.checkError,UserController.verify);
    this.router.patch("/update/password",UserValidator.updatePassword(),GlobalMiddleWare.checkError,GlobalMiddleWare.authenticate,UserController.updatePassword);
     this.router.patch('/reset/password', UserValidator.resetPassword(), GlobalMiddleWare.checkError, UserController.resetPassword);
  }
  deleteRoutes() { }
}
export default new UserRouter().router;
