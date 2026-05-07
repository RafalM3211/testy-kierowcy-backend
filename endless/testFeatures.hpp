#pragma once

#include <vector>
#include <unordered_map>
#include "features/types/types.hpp"
#include "features/tokenizer/tokenizer.hpp"

class TestFeatues {
public:
    static std::vector<Question> questionsFixture;
    static std::unordered_map<int, Tokens> tokenizedFixture;
};

