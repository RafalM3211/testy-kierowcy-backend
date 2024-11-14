import type { Application } from "express";
import type {
  Answer,
  Question,
  QuestionType,
  User,
} from "../types/globalTypes";

type AppGet = Application["get"];
type AppGetParams = Parameters<AppGet>;
type GetHandler = AppGetParams[1];
type GetHandlerParams = Parameters<GetHandler>;
export type Req = GetHandlerParams[0];
export type Res = GetHandlerParams[1];

export type EndpointHandler = (req: Req, res: Res) => void;

export interface RawQuestionRecord {
  id: number;
  content: string;
  correctAnswer: Exclude<Answer, null | boolean> | "1" | "0";
  type: QuestionType;
  value: number;
  media: string | null;
  A: string | null;
  B: string | null;
  C: string | null;
}

export interface ABCanswers {
  A: string;
  B: string;
  C: string;
}

interface QuestionValueCountPair {
  value: Question["value"];
  count: number;
}

export type DrawQuestionConfig = QuestionValueCountPair[];

export interface UserWithPassword extends User {
  password: string;
}
