import { body } from "express-validator";
import User from "../models/User";
export class UserValidator {
  static signUp() {
    return [
      body("email", "Email is Required").isEmail().custom((email,{req})=>{
      return  User.findOne({email:email}).then(user=>{
            if(user){
                throw new Error('User already exist')
            }else{
                return true
            }
        })
      }),
      body("password", "Password is Required")
        .isAlphanumeric()
        .isLength({ min: 8, max: 20 })
        .withMessage("Pasword can be 8 to 20 character long only"),
      body("username", "Username is Required").isString(),
    ];
  }
  static verifyUser(){
    return[
        body('verification_token','Verification token is required').isNumeric(),
        body('email','Email is required').isEmail()
    ]
  }
}
