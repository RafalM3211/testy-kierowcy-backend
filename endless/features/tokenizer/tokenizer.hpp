// Tokenizer.hpp
#pragma once
#include <vector>
#include <string>
#include <mutex>
#include <shared_mutex>
#include <cpprest/json.h>


struct Tokenized {
    int questionId;
    std::vector<std::string> tokens;
};

class Tokenizer {
private:
    std::vector<Tokenized> tokenizedQuestions;
    Tokenized tokenizeQuestion();
    mutable std::shared_mutex rw_mutex; 
public:
    Tokenizer() = default;

    

    void tokenizeQuestions();

    // 1. The WRITE method (Called by POST /sync-questions)
    /* void tokenizeQuestions() {
        // LOCK for writing (Exclusive access)
        std::unique_lock lock(rw_mutex);
        
        tokenizedQuestions.clear();
        tokenizedQuestions.push_back({"Question 1 tokens..."});
    } */

    // 2. The READ method (Called by GET /get-endless-question)
    /* Tokenized getQuestion(int index) const {
        // LOCK for reading (Shared access - multiple users can read at once)
        std::shared_lock lock(rw_mutex);
        
        if (index >= 0 && index < tokenizedQuestions.size()) {
            return tokenizedQuestions[index];
        }
        return {""}; // Handle out of bounds
    } */
};