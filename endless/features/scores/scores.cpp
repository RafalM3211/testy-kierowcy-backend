#include "scores.hpp"

ScoreEngine::ScoreEngine(Tokenizer& _tokenizer): tokenizer(_tokenizer){
    scores.reserve(3000);   //expected question amount to env
}

float ScoreEngine::computeSimmilarity(Tokenized& first, Tokenized& second){
    int repeatingTokens = 0;
    for(auto& firstToken: first.tokens){
        for(auto& secondToken: second.tokens){
            if (firstToken==secondToken) repeatingTokens++;
        }
    };

    int sumOfTwoSets = (first.tokens.size() + second.tokens.size()) - repeatingTokens;

    return (float)repeatingTokens/sumOfTwoSets;
}

void ScoreEngine::computeScores(std::vector<Answer> answers){
    for(auto& answer: answers){
        if(!answer.isAnsweredCorrectly){
            Tokenized& answeredQuestion = tokenizer.getTokenizedById(answer.questionId);

            for(auto& question: tokenizer.getTokenizedQuestions()){
                float simmilarityScore = computeSimmilarity(question, answeredQuestion);
                scores[question.id] += simmilarityScore;
            }
        }   
    }
}

std::unordered_map<int, float>& ScoreEngine::getScores(){
    return scores;
}

void ScoreEngine::init(){
    auto& tokenizedQuestions = tokenizer.getTokenizedQuestions();
    if(tokenizedQuestions.empty()) Logger::error("No tokenized questions. Ran ScoreEngine::init() too early");
    for(auto& question: tokenizedQuestions){
        scores[question.id] = 0;
    }
}


void ScoreEngine::logScores(){
    Logger::debug("Buckets: " + std::to_string(scores.bucket_count()));

    for(auto& entry: scores){
        Logger::debug("id: " + std::to_string(entry.first) + " score: " + std::to_string(entry.second));
    }
}