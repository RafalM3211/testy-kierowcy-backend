#include "scoreEngine.hpp"

ScoreEngine::ScoreEngine(Tokenizer& _tokenizer): tokenizer(_tokenizer){
    scores.reserve(3000);   //expected question amount to env

    tokenizer.withAllTokenized([&](const std::unordered_map<int, Tokens>& tokenizedQuestions){
        if(tokenizedQuestions.empty()) Logger::error("No tokenized questions. Ran ScoreEngine::init() too early");
        for(auto& [id, _]: tokenizedQuestions){
            scores[id] = 1;
        }
    });    
}

float ScoreEngine::computeSimmilarity(const Tokens& first, const Tokens& second){
    int repeatingTokens = 0;
    for(auto& firstToken: first){
        for(auto& secondToken: second){
            if (firstToken==secondToken) repeatingTokens++;
        }
    };

    int sumOfTwoSets = (first.size() + second.size()) - repeatingTokens;

    return (float)repeatingTokens/sumOfTwoSets;
}

void ScoreEngine::computeScores(std::vector<Answer> answers){
    tokenizer.withAllTokenized([&](const std::unordered_map<int, Tokens>& tokenizedQuestions){
        for(auto& answer: answers){
            if(!answer.isAnsweredCorrectly){
                Tokens answeredQuestionTokens = tokenizer.getTokensById(answer.questionId);

                for(auto& [id, tokens]: tokenizedQuestions){
                    float simmilarityScore = computeSimmilarity(tokens, answeredQuestionTokens);
                    scores[id] += simmilarityScore;
                }
            }   
        }
    });
}

std::unordered_map<int, float>& ScoreEngine::getScores(){
    return scores;
}

void ScoreEngine::logScores(){
    Logger::debug("Buckets: " + std::to_string(scores.bucket_count()));

    for(auto& entry: scores){
        Logger::debug("id: " + std::to_string(entry.first) + " score: " + std::to_string(entry.second));
    }
}