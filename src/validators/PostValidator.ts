import { body } from "express-validator";
export class PostValidators {
  static addPost() {
    return [body("content", "Post content is required").isString()];
  }
}
