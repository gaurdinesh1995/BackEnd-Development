import { body, query } from "express-validator";
import User from "../models/User";
export class UserValidator {
  static signUp() {
    return [
      body("email", "Email is Required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email: email }).then((user) => {
            if (user) {
              throw new Error("User already exist");
            } else {
              return true;
            }
          });
        }),
      body("password", "Password is Required")
        .isLength({ min: 8, max: 20 })
        .withMessage("Pasword can be 8 to 20 character long only"),
      body("username", "Username is Required").isString(),
    ];
  }
  static verifyUser() {
    return [
      body("verification_token", "Verification token is required").isNumeric(),
      body("email", "Email is required").isEmail(),
    ];
  }
  static login() {
    return [
      body("email", "Email is Required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email: email }).then((user) => {
            if (user) {
              req.user = user;
              return true;
            } else {
              throw new Error("User Does Not Exist");
            }
          });
        }),
      body("password", "Password is Required"),
    ];
  }

  static updatePassword() {
    return [
      body("password", "Password is Required").notEmpty(),
      body("confirm_password", "Confirm Password is Required").notEmpty(),
      body("new_password", "New Password is Required").custom(
        (newPassword, { req }) => {
          if (newPassword === req.body.confirm_password) {
            return true;
          } else {
            req.errorStatus = 422;
            throw new Error("Password and Confirm Password Does Not Match");
          }
        }
      ),
    ];
  }

  static sendResetPasswordEmail() {
    return [
      query("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email: email }).then((user) => {
            if (user) {
              return true;
            } else {
              throw new Error("User does not exist.");
            }
          });
        }),
    ];
  }
  static verifyResetPasswordToken() {
    return [
      query("reset_password_token", "Reset password token is required")
        .isNumeric()
        .custom((token, { req }) => {
          return User.findOne({
            reset_password_token: token,
            reset_password_token_time: { $gt: Date.now() },
          }).then((user) => {
            if (user) {
              return true;
            } else {
              throw new Error(
                "Token doest not exist. Please request for a new one."
              );
            }
          });
        }),
    ];
  }

  static resetPassword() {
    return [
      body("email", "Email is Required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email: email }).then((user) => {
            if (user) {
              req.user = user;
              return true;
            } else {
              throw new Error("User Does Not Exist");
            }
          });
        }),
      body("new_password", "New Password is Required")
        .isAlphanumeric()
        .custom((newPassword, { req }) => {
          if (newPassword === req.body.confirm_password) {
            return true;
          } else {
            throw new Error("Confirm Password and new Password Does not Match");
          }
        }),
      body("confirm_password", "Confirm Password is Required").isAlphanumeric(),
      body("reset_password_token", "Reset Password Token")
        .isNumeric()
        .custom(async (token, { req }) => {
          const user = req.user;
          if (!user.reset_password_token || !user.reset_password_token_time) {
            throw new Error("Reset Password Token is not set or expired.");
          }
          const isTokenMatch =
            Number(user.reset_password_token) === Number(token);
          const isTokenValid = user.reset_password_token_time > Date.now();
          if (isTokenMatch && isTokenValid) {
            return true;
          } else {
            throw new Error(
              "Reset Password Token is Invalid or Expired. Please Try Again."
            );
          }
        }),
    ];
  }
}
