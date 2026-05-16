#pragma once

#include <unordered_map>
#include <vector>
#include <random>
#include <ranges>
#include <string>

#include "../logger/logger.hpp"
#include "../types/types.hpp"

int drawQuestion( std::unordered_map<int, float>&, std::vector<int>&);