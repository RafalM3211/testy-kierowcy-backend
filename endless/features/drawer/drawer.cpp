#include "drawer.hpp"

int drawQuestion(const std::unordered_map<int, float>& scores){
    if (scores.empty()) {
        Logger::error("Map of questions is empty");
        throw "Map of questions is empty";
    }

    auto keysView = scores | std::views::keys;
    auto weightsView = scores | std::views::values;

    std::vector<int> keys(keysView.begin(), keysView.end());
    std::vector<double> weights(weightsView.begin(), weightsView.end());


    thread_local static std::random_device rd;
    thread_local static std::mt19937 gen(rd());

    std::discrete_distribution<int> distribution(weights.begin(), weights.end());

    int chosenIndex = distribution(gen);

    return keys[chosenIndex];
}