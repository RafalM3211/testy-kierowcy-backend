#include <iostream>
#include <thread>
#include <chrono>
#include <string>

#include "./features/logger/logger.hpp"
#include "./features/tokenizer/tokenizer.hpp"
#include "./features/api/api.hpp"


int main() {
    Logger::init();

    Tokenizer tokenizer;

    const std::string address = "http://0.0.0.0:8080";
    EndlessAPI api(address, tokenizer);
    api.start();

    Logger::debug("Application started");

    while (true) {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }

    return 0;
}
