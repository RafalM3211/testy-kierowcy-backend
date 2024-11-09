import httpsServer from "node:https";
import fs from "node:fs";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./env.mjs";
import questions from "./question/routes.mjs";
import media from "./media/routes.mjs";
import users from "./users/routes.mjs";

console.log("START");

const app = express();

app.use(express.json());
app.use(cookieParser(env.cookie.secret));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/question", questions);
app.use("/media", media);
app.use("/users", users);

if (env.environment === "production") {
  const options = {
    key: fs.readFileSync(env.ssl.certDir + "privkey.pem"),
    cert: fs.readFileSync(env.ssl.certDir + "fullchain.pem"),
  };

  httpsServer.createServer(options, app).listen(3001, () => {
    console.log("server is running on port 3001!");
  });
} else {
  app.listen(3001, () => {
    console.log("server is running on port 3001!");
  });
}
