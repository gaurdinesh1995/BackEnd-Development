import Comments from "../models/Comments";

export class CommentController {
  static async addComment(req, res, next) {
    const content = req.body.content;
    const post = req.post;

    try {
      const comment = new Comments({
        content: content,
        created_at: new Date(),
        updated_at: new Date(),
      });
      post.comments.push(comment._id)
      await Promise.all([comment.save(),post.save()])
      res.send(comment)
    } catch (e) {
      next(e);
    }
  }
}
