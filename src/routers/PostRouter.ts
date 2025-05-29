import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { PostValidators } from "../validators/PostValidator";
import { PostController } from "../controllers/PostController";

class PostRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.deleteRoutes();
  }

  getRoutes() {}
  postRoutes() {
    this.router.post("/add",GlobalMiddleWare.authenticate,PostValidators.addPost(),GlobalMiddleWare.checkError,PostController.addPost)
  }
  patchRoutes() {}
  deleteRoutes() {}
}

export default new PostRouter().router;
