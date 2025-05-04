import jwt from "jsonwebtoken";
import env from "../env";
import type { User } from "../../types/globalTypes";
import type { CookieOptions, Request } from "express";

export function generateToken(user: User) {
  const payload = {
    userId: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, env.jwt.secret, {
    algorithm: "HS256",
    expiresIn: "24h",
    audience: env.jwt.audience,
    issuer: env.jwt.issuer,
  });

  return token;
}

export const JWTCookieOptions: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  maxAge: 1000 * 3600 * 24,
};

export function sanitizeBody(req: Request) {
  Object.entries(req.body).forEach(([key, value]) => {
    let additionalAllowedChars = "";
    if (key === "email") {
      additionalAllowedChars = "@.";
    }
    req.body[key] = sanitize(value as string, additionalAllowedChars);
  });
}

export function sanitize(text: string, additionalAllowedChars?: string) {
  const allowedChars =
    "qwertyuiopasdfghjklzxcvbnm1234567890" + additionalAllowedChars;

  let sanitizedText = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (allowedChars.includes(char)) {
      sanitizedText += char;
    }
  }

  return sanitizedText;
}

export async function parseToken(token: string) {
  const payload = jwt.verify(token, env.jwt.secret);
  if (typeof payload === "object" && "userId" in payload) {
    const sanitizedUid = parseInt(payload.userId);

    return sanitizedUid;
  } else {
    throw "invalid token payload";
  }
}
