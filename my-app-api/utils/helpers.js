export const formatMessage = (data) => {
  return JSON.parse(JSON.stringify(data));
};
import jwt from "jsonwebtoken";

export const validateToken = (token) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  // data.exp < new Date().getTime() / 1000
  try {
    const verified = jwt.verify(token, jwtSecretKey);
    const { exp } = jwt.decode(token);
    const isExp = exp < new Date().getTime() / 1000;
    if (verified && !isExp) return true;
    else return false;
  } catch (error) {
    return false;
  }
};
