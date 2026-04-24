#include "drawer.hpp"

int drawQuestion(const std::unordered_map<int, float>& scores){
    if (scores.empty()) {
        Logger::error("Map of questions is empty");
        throw "Map of questions is empty";
    }

    std::vector<int> keys;
    std::vector<double> weights;

    keys.reserve(scores.size());
    weights.reserve(scores.size());

    for (const auto& [id, score]: scores) {
        keys.push_back(id);
        weights.push_back(score);
    };

    thread_local static std::random_device rd;
    thread_local static std::mt19937 gen(rd());

    std::discrete_distribution<int> distribution(weights.begin(), weights.end());

    int chosenIndex = distribution(gen);

    return keys[chosenIndex];
}