import { count } from "console";
import Posts from "../models/Posts";

export class PostController {
  static async addPost(req, res, next) {
    const userId = req.user.user_id;
    const content = req.body.content;
    const post = new Posts({
      user_id: userId,
      content: content,
      created_at: new Date(),
      updated_at: new Date(),
    });

    post
      .save()
      .then((post) => {
        res.send(post);
      })
      .catch((err) => {
        next(err);
      });
  }
  static async getPostByUser(req, res, next) {
    const userId = req.user.user_id;
    const page = parseInt(req.query.page) || 1;
    const perPage = 5;
    const currentPage = page;
    let totalPages;

    try {
      const postCount = await Posts.countDocuments({ user_id: userId });
      totalPages = Math.ceil(postCount / perPage);

      // Safe page range check
      const safePage = Math.max(1, Math.min(page, totalPages || 1));

      const posts = await Posts.find(
        { user_id: userId },
        { user_id: 0, __v: 0 }
      )
        .populate("comments")
        .skip(perPage * (safePage - 1))
        .limit(perPage);

      const hasNextPage = safePage < totalPages;
      const hasPrevPage = safePage > 1;

      res.json({
        post: posts,
        currentPage: safePage,
        totalPages: totalPages,
        prevPage: hasPrevPage ? safePage - 1 : null,
        nextPage: hasNextPage ? safePage + 1 : null,
        count:postCount,
        hasNextPage,
        hasPrevPage,
      });
    } catch (e) {
      next(e);
    }
  }
 static async getAllPosts(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const perPage = 5;
  const currentPage = page;
  let totalPages;

  try {
    const postCount = await Posts.estimatedDocumentCount();
    totalPages = Math.ceil(postCount / perPage);

    const safePage = Math.max(1, Math.min(page, totalPages || 1));

    const posts = await Posts.find(
      {}, // ✅ All posts
      { user_id: 0, __v: 0 } // ✅ Projection to hide fields
    )
      .populate("comments")
      .skip(perPage * (safePage - 1))
      .limit(perPage);

    const hasNextPage = safePage < totalPages;
    const hasPrevPage = safePage > 1;

    res.json({
      post: posts,
      currentPage: safePage,
      totalPages: totalPages,
      prevPage: hasPrevPage ? safePage - 1 : null,
      nextPage: hasNextPage ? safePage + 1 : null,
      count:postCount,
      hasNextPage,
      hasPrevPage,
    });
  } catch (e) {
    next(e);
  }
}
static async getPostById(req,res,next){
 res.send(req.post)
}
}
