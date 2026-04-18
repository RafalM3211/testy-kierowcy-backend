#pragma once

#include <vector>
#include <string>
#include <sstream>
#include <mutex>
#include <shared_mutex>
#include <regex>
#include <cpprest/json.h>

#include "../logger/logger.hpp"
#include "../types/types.hpp"

struct Tokenized {
    int id;
    std::vector<std::string> tokens;
};

class Tokenizer {
private:
    std::vector<Tokenized> tokenizedQuestions;
    mutable std::shared_mutex rw_mutex; 

    std::string normalizeString(const std::string&);
    Tokenized tokenize(Question&);
public:
    Tokenizer() = default;

    void tokenizeQuestions(std::vector<Question>&);

    void logTokenized();
};