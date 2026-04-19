import Router from "express-promise-router";
import {
  getAnswersStatistics,
  getExamQuestions,
  saveQuestionAnswer,
} from "./question";
import { getEndlessQuestion, syncQuestionsToEndless } from "./endless"
import { parseToken } from "../users/authentication";

const router = Router();

router.get("/get-exam", async (req, res) => {
  const questions = await getExamQuestions();

  res.status(200).jsonp(questions);
});

router.post("/send-answer", async (req, res) => {
  const { userId, questionId, isCorrect } = req.body;

  saveQuestionAnswer(userId, questionId, isCorrect);

  res.sendStatus(200);
});

router.get("/answers-statistics/:userId", async (req, res) => {
  const { userId } = req.params;

  const answersStatistics = await getAnswersStatistics(parseInt(userId));

  res.status(200).jsonp(answersStatistics);
});

router.get("/endless", async (req, res) => {
  console.log("asdasdasd hhhh");
  if (!("jwt" in req.cookies)) console.log("user not logged in");
  const userId = req.cookies.jwt? await parseToken(req.cookies.jwt) : null;

  const question = await getEndlessQuestion(userId);

  res.status(200).jsonp(question);
})

router.get("/sync-endless", async (req, res) => {

  const question = await syncQuestionsToEndless();

  res.status(200).jsonp(question);
})

export default router;
