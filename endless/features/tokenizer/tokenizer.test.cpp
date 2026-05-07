#include <gtest/gtest.h>
#include "tokenizer.hpp"
#include "../../testFeatures.hpp"

TEST(tokenizer, tokenizesQuestions){
    Tokenizer tokenizer;
    tokenizer.tokenizeQuestions(TestFeatues::questionsFixture);
    
    tokenizer.withAllTokenized([&](const std::unordered_map<int, Tokens>& tokenizedQuestions){ 
        ASSERT_EQ(tokenizedQuestions.size(), TestFeatues::tokenizedFixture.size()) << "TokenizedQuestions and tokenizedFixture sizes differ \n";  
        
        for(const auto& [id, tokenizedTokens]: tokenizedQuestions){
            Tokens computedTokens = tokenizedQuestions.at(id);
            Tokens fixtureTokens = TestFeatues::tokenizedFixture.at(id);

            ASSERT_EQ(computedTokens.size(), fixtureTokens.size()) << "TokenizedQuestions and tokenizedFixture tokens vectors sizes differ at " << id << "\n";
          
            
            for(short j=0; j<computedTokens.size(); j++){
                EXPECT_EQ(computedTokens[j], fixtureTokens[j]);
            }
        }
    });
}