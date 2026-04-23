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
       tokenizedQuestions.push_back(tokenize(question));
    }
}

std::vector<Tokenized>& Tokenizer::getTokenizedQuestions(){
    return tokenizedQuestions;
}

Tokenized& Tokenizer::getTokenizedById(int id){
    for(auto& tokenized: tokenizedQuestions){
        if(id==tokenized.id) return tokenized;
    }

    std::string message = "couldn't find tokenized question with id " + id;
    Logger::error(message);

    throw message;
}

void Tokenizer::logTokenized(){
    for(const auto& question: tokenizedQuestions){
        std::string tokens = "";
        for(const auto& token: question.tokens){
            tokens+=" " + token;
        }

        Logger::debug("TOKENIZED - id: " + std::to_string(question.id) + " tokens: " + tokens);
    };
}