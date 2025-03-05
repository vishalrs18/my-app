import { getDb } from "../../db/db.js";

export const getBlogsModel = async () => {
  const db = getDb();
  try {
    const { rows } = await db.query(`SELECT blogs.blog_id, blogs.blog_title, blogs.blog_content, users.user_id , users.email
  FROM blogs
  JOIN users
  ON blogs.user_id = users.user_id`);
    return rows;
  } catch (error) {
    return error.message;
  }
};

export const postBlogModel = async (data) => {
  const db = getDb();
  try {
    const { rows } = await db.query(
      "INSERT INTO blogs(blog_title, blog_content, user_id) VALUES ($1, $2, $3)",
      [data.blog_title, data.blog_content, data.user_id]
    );
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};
