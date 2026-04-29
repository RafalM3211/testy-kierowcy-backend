#include <gtest/gtest.h>
#include "scoreEngine.hpp"
#include "../tokenizer/tokenizer.hpp"

TEST(group, test1){
    Tokenizer tokenizer;
    ScoreEngine scoreEngine(tokenizer);

    EXPECT_NEAR(0.333f, 0.333f, 0.001f);
}