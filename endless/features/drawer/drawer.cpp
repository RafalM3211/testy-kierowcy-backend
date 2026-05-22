module;

#include <unordered_map>
#include <vector>
#include <random>
#include <ranges>
#include <string>
#include "../types/types.hpp"

export module Drawer;

export int drawQuestion( std::unordered_map<int, float>& scores, std::vector<int>& prevIds){
    if (scores.empty()) {
        throw CustomError{"Map of questions is empty"};
    }

    for(int id: prevIds){
        scores[id] = 0;
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