import { getBlogsModel, postBlogModel } from "../models/auth/blogs-model.js";
import { validateToken } from "../utils/helpers.js";

export const getBlogs = async (req, res, next) => {
  const data = await getBlogsModel();
  return res.status(200).json({
    data: data,
    statusCode: 200,
  });
};

export const postBlogs = async (req, res, next) => {
  const data = await postBlogModel(req.body);
  if(!data) {
    return res.status(500).json({
      statusCode: 500,
      message: "Error while saving blog"
    })
  }
  return res.status(200).json({
    message: "Blog posted successfully",
    statusCode: 200,
  });
};
