import { body, param, query } from "express-validator";
import Posts from "../models/Posts";
export class PostValidators {
  static addPost() {
    return [body("content", "Post content is required").isString()];
  }
  static getPostById() {
    return [
      param("id", "Post id is required").custom((id, { req }) => {
        return Posts.findOne({ _id: id },{__v:0,user_id:0}).populate('comments').then((post) => {
          if (post) {
            req.post = post;
            return true;
          } else {
            throw new Error("Post does not exist");
          }
        });
      }),
    ];
  }
}
