import type {
  BasicQuestion,
  Question,
  SpecializedQuestion,
} from "../../types/globalTypes";
import { addPropToObject } from "../helpers";
import type { ABCanswers, RawQuestionRecord } from "../types";

type PartiallyProcessedQuestion = Partial<RawQuestionRecord> & {
  correctAnswer: Question["correctAnswer"];
};

export function prepareQuestion(rawQuestion: RawQuestionRecord): Question {
  const correctAnswer = prepareCorrectAnswer(rawQuestion.correctAnswer);

  const partiallyPreparedQuestion = {
    ...(rawQuestion as Partial<RawQuestionRecord>),
    correctAnswer,
  } as PartiallyProcessedQuestion;

  if (rawQuestion.type === "specialized") {
    const { A, B, C } = rawQuestion;

    if (A && B && C) {
      const answers = {
        A,
        B,
        C,
      } satisfies ABCanswers;
      addPropToObject(partiallyPreparedQuestion, "answers", answers);
    } else
      console.warn(
        "Question with type specialized should have A, B and C answers. Question id: " +
          rawQuestion.id
      );
  }

  delete partiallyPreparedQuestion.A;
  delete partiallyPreparedQuestion.B;
  delete partiallyPreparedQuestion.C;

  return partiallyPreparedQuestion as BasicQuestion | SpecializedQuestion;
}

function prepareCorrectAnswer(
  rawCorrectAnswer: RawQuestionRecord["correctAnswer"]
): Question["correctAnswer"] {
  const parsed = parseInt(rawCorrectAnswer);

  if (!Number.isNaN(parsed)) {
    const correctAnswer = !!parsed;
    return correctAnswer;
  } else {
    return rawCorrectAnswer as "A" | "B" | "C";
  }
}
