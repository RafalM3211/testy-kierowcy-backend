import Router from "express-promise-router";
import {
  getAnswersStatistics,
  getExamQuestions,
  saveQuestionAnswer,
} from "./question";

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

export default router;
