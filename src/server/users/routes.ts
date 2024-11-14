import Router from "express-promise-router";
import { addUser, getUserByEmail, getUserById } from "./users";
import { errorMessage } from "../messages";
import { getUserByCredentials } from "./users";
import {
  generateToken,
  JWTCookieOptions,
  parseToken,
  sanitizeBody,
} from "./authentication";
import type { User } from "../../types/globalTypes";
import { withoutProperty } from "../helpers";

const router = Router();

router.post("/register", async (req, res) => {
  sanitizeBody(req);
  const { email, userName, password } = req.body;

  if (!email || !password) {
    res.status(400).jsonp(errorMessage("AUTHENTICATION_FAILED"));
  }

  const userExist = !!(await getUserByEmail(email));

  if (userExist) {
    res.status(401).jsonp(errorMessage("USER_EXISTS"));
  } else {
    const user = await addUser(email, password, userName);
    if (!user)
      throw new Error(
        "Something went wrong when creating user. Unable to find user in database"
      );
    const userWithoutPassword = withoutProperty(user, "password") as User;
    const token = generateToken(userWithoutPassword);

    res
      .status(201)
      .cookie("jwt", token, JWTCookieOptions)
      .jsonp(userWithoutPassword);
  }
});

router.post("/signin", async (req, res) => {
  let user: User | null = null;
  sanitizeBody(req);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).jsonp(errorMessage("AUTHENTICATION_FAILED"));
  }

  user = await getUserByCredentials(email, password);

  if (!user) {
    res.status(401).jsonp(errorMessage("AUTHENTICATION_FAILED"));
  } else {
    const token = generateToken(user);
    res.status(200).cookie("jwt", token, JWTCookieOptions).jsonp(user);
  }
});

router.post("/signout", async (req, res) => {
  res
    .status(200)
    .clearCookie("jwt", { ...JWTCookieOptions, maxAge: 0 })
    .send();
});

router.get("/check-token", async (req, res) => {
  try {
    if (!("jwt" in req.cookies)) throw "token not present";
    const { jwt } = req.cookies;
    const userId = await parseToken(jwt);
    if (!userId) throw "user id not present in payload";
    const user = await getUserById(userId);
    if (!user) throw "coundn't find user with id " + userId;

    res.status(200).jsonp(user);
  } catch (message) {
    console.log(message);
    res.status(401).jsonp(errorMessage("INVALID_TOKEN"));
  }
});

export default router;
