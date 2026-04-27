#pragma once

#include <vector>
#include <unordered_map>
#include <string>
#include <sstream>
#include <mutex>
#include <shared_mutex>
#include <regex>
#include <cpprest/json.h>

#include "../logger/logger.hpp"
#include "../types/types.hpp"

/* struct Tokenized {
    std::vector<std::string> tokens;
}; */

typedef std::vector<std::string> Tokens;

typedef std::pair<int, Tokens> Tokenized;

class Tokenizer {
private:
    std::unordered_map<int, Tokens> tokenizedQuestions;
    mutable std::shared_mutex rw_mutex; 

    std::string normalizeString(const std::string&);
    Tokenized tokenize(Question&);
public:
    Tokenizer() = default;

    void tokenizeQuestions(std::vector<Question>&);
    std::unordered_map<int, Tokens>& getTokenizedQuestions();
    Tokens& getTokensById(int id);

    void logTokenized();
};