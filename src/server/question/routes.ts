import Router from "express-promise-router";
import {
  getAnswersStatistics,
  getExamQuestions,
  saveQuestionAnswer,
} from "./question";
import { getEndlessQuestion, syncQuestionsToEndless } from "./endless"

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

  const question = await getEndlessQuestion();

  res.status(200).jsonp(question);
})

router.get("/sync-endless", async (req, res) => {

  const question = await syncQuestionsToEndless();

  res.status(200).jsonp(question);
})

export default router;
