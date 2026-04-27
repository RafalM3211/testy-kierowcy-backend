#include "tokenizer.hpp"

Tokenized Tokenizer::tokenize(Question& question){
    std::string content = normalizeString(question.content);
    std::vector<std::string> tokens;
    std::stringstream contentStream(content);
    
    std::string token;
    while(getline(contentStream, token, ' '))
    {
        tokens.push_back(token);
    }
    
    Tokenized tokenized{question.id, tokens};
    
    return tokenized;
}

std::string Tokenizer::normalizeString(const std::string& input) {
    std::string clean = "";

    for(char c : input) {
        unsigned char uc = static_cast<unsigned char>(c);
        if(std::isalnum(uc) || uc > 127 || uc == ' ') {
            clean += tolower(c);
        }
    }

    return clean;
}

void Tokenizer::tokenizeQuestions(std::vector<Question>& questions){
    std::unique_lock lock(rw_mutex);
        
    tokenizedQuestions.clear();
    for(auto& question: questions){
       tokenizedQuestions.insert(tokenize(question));
    }
}

std::unordered_map<int, Tokens>& Tokenizer::getTokenizedQuestions(){
    std::shared_lock lock(rw_mutex);
    return tokenizedQuestions;
}

Tokens& Tokenizer::getTokensById(int id){
    std::shared_lock lock(rw_mutex);
    try{
        return tokenizedQuestions.at(id);
    }
    catch (const std::exception& e) {
        std::string message = "couldn't find tokenized question with id " + id;
        Logger::error(message);
        throw message;
    }
}

void Tokenizer::logTokenized(){
    std::shared_lock lock(rw_mutex);
    for(const auto& [id, tokens]: tokenizedQuestions){
        std::string tokensString = "";
        for(const auto& token: tokens){
            tokensString+=" " + token;
        }

        Logger::debug("TOKENIZED - id: " + std::to_string(id) + " tokens: " + tokensString);
    };
}