import { request } from "express";
import { getUserModel } from "../models/auth/auth-model.js";
import { validateToken } from "../utils/helpers.js";
import Csrf from "csrf";
import jwt from "jsonwebtoken";

export const tokenValidation = (req, res, next) => {
  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  const token = req.header(tokenHeaderKey);

  const isValid = validateToken(token);
  if (!isValid) {
    return res.status(404).json({
      message: "Unauthorized",
      statusCode: 404,
    });
  }
  next();
};
// request.
export const isUserAdmin = async (req, res, next) => {
  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  const token = req.header(tokenHeaderKey);

  const decodedToken = token ? jwt.decode(token) : "";
  const userData = await getUserModel(decodedToken.email);

  if (!userData?.is_admin) {
    return res.status(403).json({
      statusCode: 403,
      message: "You are not authorized to perform this action",
    });
  }
  next();
};

export const csrfValidation = (req, res, next) => {
  const csrf = new Csrf();
  const secret = process.env.CSRF_SECRET;
  const token = req.header("X-CSRF-Token");
  const isValid = csrf.verify(secret, token);
  // console.log(isValid, token);
  if (!isValid) {
    return res.status(404).json({
      message: "Unauthorized",
      statusCode: 404,
    });
  }
  next();
};
