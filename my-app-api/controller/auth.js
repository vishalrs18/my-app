import { validationResult } from "express-validator";
import { getAllUsersModels, updateUserModel, userLoginModel, userSignupModel } from "../models/auth/auth-model.js";
import jwt from "jsonwebtoken";

export const postSignup = async (req, res, next) => {
  const result = validationResult(req);

  if (result.errors.length) {
    return res.status(400).json({ message: [...new Set(result.errors.map((i) => i.msg))], statusCode:400 });
  }
  const data = await userSignupModel(req.body);
  
  if (data) {
    const token = generateToken(data);
    return res.status(200).json({
      access_token: token,
      message: "User has been Created successfully",
      statusCode: 200,
    });
  }

  return res.status(200).json({
    message: "Failed to create user",
    statusCode: 400,
  });
};

export const postLogin = async (req, res, next) => {
  const result = validationResult(req);
  if (result.errors.length) {
    return res
      .status(400)
      .json({ message: "Invalid Email or Password", statusCode: 400 });
  }

  const data = await userLoginModel(req.body);

  if (!data) {
    return res
      .status(400)
      .json({ message: "Invalid Email or Password", statusCode: 400 });
  } else {
    const token = generateToken(data);

    return res.status(200).json({
      access_token: token,
      message: "User logged in successfully",
      statusCode: 200,
    });
  }
};

export const getAllUsers = async (req, res, next) => {
  const data = await getAllUsersModels();
  return res.status(200).json({
    statusCode: 200,
    data: data
  })
}

export const updateUser = async (req, res, next) => {
  const data = await updateUserModel(req.body);
  if(!data) {
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to update user permission"
    })
  } 
  return res.status(200).json({
    statusCode: 200,
    message: "User Permission has been updated"
  })
}

const generateToken = (data) => {
  const isAdmin = data?.is_admin ?? false;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let userData = {
    ...timeStamp(Date.now(), 60),
    isAdmin,
    user_id: data?.user_id,
    email: data?.email,
    permission: data?.permission,
    is_admin: data?.is_admin
  };

  const token = jwt.sign(userData, jwtSecretKey, {
    expiresIn: 86400 //24 hrs
  });
  return token;
};

const timeStamp =  function (dt, minutes) {
  return {
    created_at: new Date(),
    expires_at: new Date(new Date().getTime() + minutes*60000)
  }
}
