#include <gtest/gtest.h>
#include "scoreEngine.hpp"
#include "../tokenizer/tokenizer.hpp"
#include "../../testFeatures.hpp"

TEST(scoreEngine, computesSimmilarity){
    Tokenizer tokenizer;
    tokenizer.tokenizeQuestions(TestFeatues::questionsFixture);
    ScoreEngine scoreEngine(tokenizer);

    Tokens first = {"hello", "driver", "one"};
    Tokens second = {"hello", "driver", "two"};

    float simmilarity = scoreEngine.computeSimmilarity(first, second);

    EXPECT_NEAR(simmilarity, 0.5f, 0.001f);
}

TEST(scoreEngine, computesSimmilarityWhenEqual){
    Tokenizer tokenizer;
    tokenizer.tokenizeQuestions(TestFeatues::questionsFixture);
    ScoreEngine scoreEngine(tokenizer);

    Tokens first = {"hello", "driver", "one"};
    Tokens second = {"hello", "driver", "one"};

    float simmilarity = scoreEngine.computeSimmilarity(first, second);

    EXPECT_NEAR(simmilarity, 1.0f, 0.001f);
}

TEST(scoreEngine, handlesZeroSimmilarity){
    Tokenizer tokenizer;
    tokenizer.tokenizeQuestions(TestFeatues::questionsFixture);
    ScoreEngine scoreEngine(tokenizer);

    Tokens first = {"hello", "driver", "one"};
    Tokens second = {"hi", "passenger", "two"};

    float simmilarity = scoreEngine.computeSimmilarity(first, second);

    EXPECT_NEAR(simmilarity, 0.0f, 0.001f);
}