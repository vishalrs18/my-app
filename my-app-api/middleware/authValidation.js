import { body, check } from "express-validator";
import { getDb } from "../db/db.js  ";

export const loginValidation = [
  check("email", "Please, enter a valid email")
    .isEmail()
    .normalizeEmail()
    .notEmpty()
    .trim(),
  check("password", "Please, enter a valid password")
    .isLength({ min: 8 })
    .isAlphanumeric()
    .trim(),
];

export const signUpValidation = [
  check("email", "Please, enter a valid email")
    .isEmail()
    .normalizeEmail()
    .notEmpty()
    .trim()
    .custom((val) => {
      let db = getDb();
      return db
        .query("select * from users where email = $1", [val])
        .then((result) => {
          if (result.rows.length >= 1) {
            return Promise.reject("Email Already Exist");
          }
          return true;
        });
    }),
  body(
    "password",
    "Please, enter a password text and numbers with min 8 chars"
  )
    .isLength({ min: 8 })
    .isAlphanumeric()
    .trim(),
  body(
    "confirmPassword",
    "Confirm password does not match with actual password"
  ).custom((value, { req }) => {
    if (value !== req.body.password || value === "") {
      throw new Error();
    }
    return true;
  }),
];
