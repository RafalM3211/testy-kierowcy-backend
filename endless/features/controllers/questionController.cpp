#include "questionController.hpp"

using namespace web;
using namespace web::http;

void handleGetQuestion(http_request request, Tokenizer& tokenizer, ScoreEngine& scoreEngine) {
    try {
        json::value body = request.extract_json().get();
        json::array jsonAnswers = body.as_array();

        std::vector<Answer> answers;
        for (auto& jsonAnswer : jsonAnswers) {
            Answer answer;
            answer.questionId = jsonAnswer.at(U("question_id")).as_integer();
            answer.isAnsweredCorrectly = jsonAnswer.at(U("isAnsweredCorrectly")).as_bool();
            answers.push_back(answer);
        }
        
        for (auto& answer : answers) {
            Logger::debug("Answer ID: " + std::to_string(answer.questionId) + 
                          " isCorrect: " + std::to_string(answer.isAnsweredCorrectly));
        }

        scoreEngine.computeScores(answers);
        int nextId = drawQuestion(scoreEngine.getScores());
        Logger::info("Drawed question: " + std::to_string(nextId));
        
        json::value response;
        response[U("id")] = json::value::number(nextId);
        request.reply(status_codes::OK, response);
    }
    catch (const web::json::json_exception& e) {
        Logger::error(std::string("Invalid JSON format: ") + e.what());
        request.reply(status_codes::BadRequest, U("Invalid JSON body"));
    }
    catch (const std::exception& e) {
        Logger::error(std::string("HTTP Error extracting JSON: ") + e.what());
        request.reply(status_codes::BadRequest, U("Failed to read JSON."));
    }

    scoreEngine.logScores();
}