import express from "express";
import env from "./env";
import cors from "cors";
import cookieParser from "cookie-parser";
import questions from "./question/routes";
import media from "./media/routes";
import users from "./users/routes";

console.log("START");

const server = express();

server.use(express.json());
server.use(cookieParser(env.cookie.secret));
server.use(
  cors({
    origin: true,
    credentials: true,
  })
);

server.use("/question", questions);
server.use("/media", media);
server.use("/users", users);

server.listen(3001, () => {
  console.log("server is running on port 3001!");
});
