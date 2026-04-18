import { getAllQuestions, getQuestionsWhere } from "../db/dbApi";
import env from "../env"


const endlessApiURL= `http://${env.endless.endlessURL}:${env.endless.endlessPort}/`

export async function getEndlessQuestion(){
    const endpointName = "get-endless-question";
    const res = await fetch(endlessApiURL + endpointName);
    const question = await res.json();

    return question
}

export async function syncQuestionsToEndless(attpemt: number = 1) {
    const timeToRetry = 2000;
    const maxAttempts = 8;

    try{
        const endpointName = "sync-questions";
        const questions = await getAllQuestions();
        const res = await fetch(endlessApiURL + endpointName , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(questions)
        }) as any;

        if(res.ok) console.log("questions synchronized successfully");
    }
    catch (e) {
        console.error(`Endless service not ready yet, retrying in ${timeToRetry/1000} seconds...`);
        if(attpemt <= maxAttempts) {
            setTimeout(()=>{syncQuestionsToEndless(++attpemt)}, timeToRetry)
        }
        else {
            console.error(`Failed to sync with endless in ${maxAttempts} attempts`);
        }
    }
}