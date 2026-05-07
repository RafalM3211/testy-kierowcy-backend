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
    std::string lower_input = input;
    std::transform(lower_input.begin(), lower_input.end(), lower_input.begin(),
                   [](unsigned char c) { return std::tolower(c); });

    std::regex unwanted_chars("[^a-z0-9 \\x80-\\xFF]");

    return std::regex_replace(lower_input, unwanted_chars, "");
}

void Tokenizer::tokenizeQuestions(std::vector<Question>& questions){
    std::unique_lock lock(rw_mutex);
        
    tokenizedQuestions.clear();
    for(auto& question: questions){
       tokenizedQuestions.insert(tokenize(question));
    }
}

Tokens Tokenizer::getTokensById(int id){
    std::shared_lock lock(rw_mutex);
    try{
        return tokenizedQuestions.at(id);
    }
    catch (const std::exception& e) {
        throw CustomError{"couldn't find tokenized question with id " + id};
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