import e from "express";
import { connectDb } from "./db/db.js";
import { authRoutes } from "./routes/auth.js";
import cors from "cors";
import { configDotenv } from "dotenv";
import { blogRoutes } from "./routes/blogs.js";
import csrf from "csrf";
import { tokenValidation } from "./middleware/middlewares.js";

const app = e();
configDotenv();
app.use(e.json());

const corsOptions = {
  origin: process.env.CLIENT_DOMAIN,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/api/csrf-token", tokenValidation, (req, res) => {
  const csrf1 = new csrf();
  const secret = process.env.CSRF_SECRET;
  const token = csrf1.create(secret);
  res.json({ csrfToken: token });
});

app.use("/auth", authRoutes);
app.use(blogRoutes);

app.get("/", (req, res) => {
  res.send("App is running");
});

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    errorStack: error.stack,
  });
};

app.use(function (req, res) {
  res.status(404);
  res.send("URL cannot found");
});

app.use(errorHandler);

connectDb().then((res) => {
  app.listen(4001);
});
