import { randomInt } from "../helpers";
import { prepareQuestion } from "../db/dbProcessor";
import {
  getCorrectStatisticsByUserId,
  getQuestionCount,
  getQuestionsWhere,
  saveQuestionAnswerWith,
} from "../db/dbApi";
import type { RawQuestionRecord, DrawQuestionConfig } from "../types";
import type {
  AnswersStatistics,
  BasicQuestion,
  ExamQuestions,
  Question,
  SpecializedQuestion,
  User,
} from "../../types/globalTypes";

export async function getExamQuestions(): Promise<ExamQuestions> {
  const basicQuestionValueMap = [
    { value: 3, count: 10 },
    { value: 2, count: 6 },
    { value: 1, count: 4 },
  ] satisfies DrawQuestionConfig;

  const specializedQuestionValueMap = [
    { value: 3, count: 6 },
    { value: 2, count: 4 },
    { value: 1, count: 2 },
  ] satisfies DrawQuestionConfig;

  const basicQuestions = (await drawExamQuestions(
    basicQuestionValueMap,
    "basic"
  )) as BasicQuestion[];
  const specializedQuestions = (await drawExamQuestions(
    specializedQuestionValueMap,
    "specialized"
  )) as SpecializedQuestion[];

  return {
    basic: basicQuestions,
    specialized: specializedQuestions,
  };
}

async function drawExamQuestions(
  NvalueQestionsCount: DrawQuestionConfig,
  type: Question["type"]
): Promise<Question[]> {
  const rawFinalQuestions: RawQuestionRecord[] = [];

  for await (const { count, value: questionValue } of NvalueQestionsCount) {
    const allQuestions = await getQuestionsWhere(
      "type=$1 AND value=$2 AND category=$3",
      [type, questionValue, "B"]
    );
    const countedQuestions = drawNQuestionsFrom(count, allQuestions);

    rawFinalQuestions.push(...countedQuestions);
  }

  const preparedQuestions = rawFinalQuestions.map((question) => {
    return prepareQuestion(question);
  });

  return preparedQuestions;
}

function drawNQuestionsFrom(count: number, questions: RawQuestionRecord[]) {
  const container: undefined[] = new Array(count);
  container.fill(undefined);
  const usedIndexes: number[] = [];

  const finalQuestions = container.map(() => {
    let randomIndex = randomInt(0, questions.length);
    let iterations = 1;
    while (usedIndexes.includes(randomIndex)) {
      randomIndex = randomInt(0, questions.length);
      iterations++;
      if (iterations > 200) {
        throw new Error(
          `Can't find ${count} distinct questions. Loop exceeded 500 iterations`
        );
      }
    }

    usedIndexes.push(randomIndex);
    return questions[randomIndex];
  });

  return finalQuestions;
}

export function saveQuestionAnswer(
  userId: User["id"],
  questionId: Question["id"],
  isCorrect: boolean
) {
  saveQuestionAnswerWith(userId, questionId, isCorrect);
}

export async function getAnswersStatistics(userId: number) {
  const correctStatistics = await getCorrectStatisticsByUserId(userId);
  const questionCount = await getQuestionCount();

  const answeredCount = correctStatistics.correct + correctStatistics.wrong;
  const unansweredCount = questionCount - answeredCount;

  const answersStatistics = {
    ...correctStatistics,
    unanswered: unansweredCount,
  } satisfies AnswersStatistics;

  return answersStatistics;
}
