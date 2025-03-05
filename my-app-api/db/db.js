import pg from "pg";

let db;

export const connectDb = async (_cb) => {
  const client = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    database: process.env.DB_DATABASE,
  });
  const data = await client.connect();
  db = client;
  return data;
};

export const getDb = () => {
  if (db) {
    return db;
  } else throw new Error("Error connect to db");
};
