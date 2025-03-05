import e from "express";
import { getAllUsers, postLogin, postSignup, updateUser } from "../controller/auth.js";
import { loginValidation, signUpValidation } from "../middleware/authValidation.js";
import { isUserAdmin, tokenValidation } from "../middleware/middlewares.js";

export const authRoutes = e.Router();

authRoutes.post('/sign-up', signUpValidation, postSignup);

authRoutes.post("/login", loginValidation, postLogin);

authRoutes.get('/all-users', tokenValidation, isUserAdmin, getAllUsers);

authRoutes.patch('/user', tokenValidation, isUserAdmin, updateUser);
