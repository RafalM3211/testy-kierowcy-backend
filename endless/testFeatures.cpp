#include "testFeatures.hpp"

std::vector<Question> TestFeatues::questionsFixture = {
    {1, "Czy linia wskazuje miejsce zatrzymania?"},
    {2, "Czy masz obowiązek zatrzymać się w wyznaczonym miejscu?"},
    {3, "Czy w tej sytuacji wolno Ci wjechać?"}
};

std::unordered_map<int, Tokens> TestFeatues::tokenizedFixture = {
    {1, {"czy", "linia", "wskazuje", "miejsce", "zatrzymania"}},
    {2, {"czy", "masz", "obowiązek", "zatrzymać", "się", "w", "wyznaczonym", "miejscu"}},
    {3, {"czy", "w", "tej", "sytuacji", "wolno", "ci", "wjechać"}}
};