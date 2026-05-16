#include "questionController.hpp"

using namespace web;
using namespace web::http;

void handleGetQuestion(http_request request, Tokenizer& tokenizer) {
    try {
        ScoreEngine scoreEngine(tokenizer);
        json::value body = request.extract_json().get();

        std::string corId = Helpers::getCorrelationId(request);

        json::array jsonAnswers = body.at(U("userAnswers")).as_array();
        json::array jsonPrevQuestions = body.at(U("prevQuestionsIds")).as_array();

        std::vector<Answer> answers;
        for (auto& jsonAnswer : jsonAnswers){
            Answer answer;
            answer.questionId = jsonAnswer.at(U("question_id")).as_integer();
            answer.isAnsweredCorrectly = jsonAnswer.at(U("isAnsweredCorrectly")).as_bool();
            answers.push_back(answer);
        }

        std::vector<int> prevQuestionsIds;
        for(auto& jsonPrevId: jsonPrevQuestions){
            prevQuestionsIds.push_back(jsonPrevId.as_integer());
        }
        
        for (auto& answer : answers) {
            Logger::debug("Answer ID: " + std::to_string(answer.questionId) + 
                          " isCorrect: " + std::to_string(answer.isAnsweredCorrectly), corId);
        }

        for (auto& prevId : prevQuestionsIds) {
            Logger::debug("Question ID: " + std::to_string(prevId), corId);
        }

        scoreEngine.computeScores(answers);
        int nextId = drawQuestion(scoreEngine.getScores(), prevQuestionsIds);
        Logger::debug("Drawed question: " + std::to_string(nextId), corId);
        scoreEngine.logScores();
        
        json::value response;
        response[U("id")] = json::value::number(nextId);
        request.reply(status_codes::OK, response);
    }
    catch (const web::json::json_exception& e) {
        Logger::error(std::string("Invalid JSON format: ") + e.what(), Helpers::getCorrelationId(request));
        request.reply(status_codes::BadRequest, U("Invalid JSON body"));
    }
    catch (const std::exception& e) {
        Logger::error(std::string("HTTP Error extracting JSON: ") + e.what(), Helpers::getCorrelationId(request));
        request.reply(status_codes::BadRequest, U("Failed to read JSON."));
    }
    catch (const CustomError e){
        Logger::error(e.message, Helpers::getCorrelationId(request));
        request.reply(status_codes::InternalError, U(e.message));
    }
}