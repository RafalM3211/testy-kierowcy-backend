import { getQuestionsWhere, getUserAnswers } from "../db/dbApi";
import env from "../env";
import { randomAlphaNumeric } from "../helpers";


const endlessApiURL = `http://${env.endless.endlessURL}:${env.endless.endlessPort}/`;

export async function getEndlessQuestion(userId: number | null, prevQuestionsIds: number[]) {
  const endpointName = "get-endless-question";

  const userAnswers = userId ? await getUserAnswers(userId) : [];

  console.log("user: ", userId, "answers: ", userAnswers);
  console.log("quesiton ids: ", prevQuestionsIds);

  
  const res = await fetch(endlessApiURL + endpointName, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Correlation-ID": randomAlphaNumeric(10),
    },
    body: JSON.stringify({
      prevQuestionsIds,
      userAnswers
    }),
  });
  
  if(!res.ok) throw await res.text();
  const drawedId: { id: number } = await res.json();
  console.log("drawed id: " + drawedId.id);

  

  const question = await getQuestionsWhere("id=$1 AND category=$2", [
    drawedId.id,
    "B",
  ]);

  return question;
}

export async function syncQuestionsToEndless(attpemt: number = 1) {
  const timeToRetry = 2000;
  const maxAttempts = 8;

  try {
    const endpointName = "sync-questions";
    const questions = await getQuestionsWhere("category=$1", ["B"]);
    console.log("number of questions: " + questions.length);
    const res = (await fetch(endlessApiURL + endpointName, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questions),
    })) as any;

    if (res.ok) console.log("questions synchronized successfully");
  } catch (e) {
    console.error(
      `Endless service not ready yet, retrying in ${timeToRetry / 1000} seconds...`,
    );
    if (attpemt <= maxAttempts) {
      setTimeout(() => {
        syncQuestionsToEndless(++attpemt);
      }, timeToRetry);
    } else {
      console.error(`Failed to sync with endless in ${maxAttempts} attempts`);
    }
  }
}
