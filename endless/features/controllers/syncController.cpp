#include "syncController.hpp"

using namespace web;
using namespace web::http;

void handleSync(http_request request, Tokenizer& tokenizer) {
    try {
        json::value body = request.extract_json().get();
        json::array jsonQuestions = body.as_array();

        std::vector<Question> questions;
        for (auto& jsonQuestion : jsonQuestions) {
            Question question;
            question.id = jsonQuestion.at(U("id")).as_integer();
            question.content = utility::conversions::to_utf8string(jsonQuestion.at(U("content")).as_string());
            questions.push_back(question);
        }
        
        tokenizer.tokenizeQuestions(questions);
        tokenizer.logTokenized();
        
        json::value response;
        response[U("message")] = json::value::string(U("Questions successfully synchronized."));
        request.reply(status_codes::OK, response);
    }
    catch (const web::json::json_exception& e) {
        Logger::error(std::string("Invalid JSON format: ") + e.what());
        request.reply(status_codes::BadRequest, U("Invalid JSON body"));
    }
    catch (const std::exception& e) {
        Logger::error(std::string("HTTP Error extracting JSON: ") + e.what());
        request.reply(status_codes::BadRequest, U("Failed to read JSON. Check Content-Type header."));
    }
}