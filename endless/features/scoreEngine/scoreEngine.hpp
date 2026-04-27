#pragma once

#include <unordered_map>

#include "../types/types.hpp"
#include "../tokenizer/tokenizer.hpp"

class ScoreEngine {
    private:
        std::unordered_map<int, float> scores;
        Tokenizer& tokenizer;

    public:
        ScoreEngine(Tokenizer&);

        float computeSimmilarity(const Tokens&, const Tokens&);
        void computeScores(std::vector<Answer>);
        std::unordered_map<int, float>& getScores();

        void logScores();
};