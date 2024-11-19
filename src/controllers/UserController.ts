export class UserController {
  static login(req, res,next) {
    const error = new Error("this is a test error")
    next(error)
  }
}
