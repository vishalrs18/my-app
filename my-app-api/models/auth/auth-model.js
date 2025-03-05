import { getDb } from "../../db/db.js";
import bcrypt from "bcryptjs";

export const userLoginModel = async (user) => {
  const db = getDb();
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    user.email,
  ]);
  if (rows.length === 0) return false;
  let isValidPsd = await validatePassword(user.password, rows[0].password);
  return isValidPsd ? rows[0] : false;
};

export const userSignupModel = async (user) => {
  const db = getDb();
  const hashedPsd = await hashPassword(user.password);
  let data;
  try {
    data = await db.query(
      "INSERT INTO users(email, password, permission) VALUES ($1, $2, $3) returning *",
      [user.email, hashedPsd, ["view", "update"]]
    );
  } catch (err) {
    console.log(err);
    return false;
  }
  return data?.rows[0];
};

export const getAllUsersModels = async () => {
  const db = getDb();
  const { rows } = await db.query(
    "Select user_id, email, is_admin, permission from users"
  );
  return rows;
};

export const getUserModel = async (email) => {
  const db = getDb();
  const { rows } = await db.query("Select * from users where email = $1", [
    email,
  ]);
  return rows?.[0];
};

export const updateUserModel = async (body) => {
  const db = getDb();
  try {
    const data = await db.query(
      `UPDATE users
        SET permission = $1
        WHERE user_id = $2 returning *`,
      [body.permission, body.user_id]
    );
    return data;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

const validatePassword = async (enteredPsd, dbPsd) => {
  const enteredHashedPasswrd = await bcrypt.compare(enteredPsd, dbPsd);
  return enteredHashedPasswrd;
};

const hashPassword = async (text) => {
  const hashedVal = bcrypt.hash(text, 10);
  return hashedVal;
};
