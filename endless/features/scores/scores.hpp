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

        float computeSimmilarity(Tokenized&, Tokenized&);
        void computeScores(std::vector<Answer>);
        void init();
        
        void logScores();
};