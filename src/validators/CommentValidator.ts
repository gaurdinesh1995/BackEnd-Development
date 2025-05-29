import { body, param } from "express-validator";
import Posts from "../models/Posts";
export class CommentValidators {
  static addComment() {
    return [
      body("content", "Comment content is required.").isString(),
      param("id").custom((id, { req }) => {
        return Posts.findOne({ _id: id }).then((post) => {
          if (post) {
            req.post = post;
            return true;
          } else {
            throw new Error("Post does not exist.");
          }
        });
      }),
    ];
  }
}
