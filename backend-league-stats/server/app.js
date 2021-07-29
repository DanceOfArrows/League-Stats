import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import mongoose from "mongoose";
import "@babel/polyfill";

import { database_uri } from "./config";
import championRotation from "./routes/championRotation";
import leaderboard from "./routes/leaderboard";
import summoner from "./routes/summoner";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors({ origin: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/championRotation", championRotation);
app.use("/leaderboard", leaderboard);
app.use("/summoner", summoner);

/* Connect to MongoDB */
mongoose.connect(database_uri, {
  useCreateIndex: true,
  useFindAndModify: false, // flag needed to enable findOneAndUpdate
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/* Check if server is running */
app.get("/", (req, res) => {
  res.json("Server is running!");
});

/* Error Handlers */
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    title: err.title || "Uncaught Error",
    message: err.message,
  });
});

export default app;
