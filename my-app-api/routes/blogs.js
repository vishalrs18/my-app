import e from "express";
import { getBlogs, postBlogs } from "../controller/blogs.js";
import { csrfValidation, tokenValidation } from "../middleware/middlewares.js";
// import { postLogin, postSignup } from "../controller/auth.js";

export const blogRoutes = e.Router();

blogRoutes.get('/blogs', getBlogs);

blogRoutes.post('/blogs', tokenValidation, csrfValidation, postBlogs);

// authRoutes.post("/login", loginValidation, postLogin);
