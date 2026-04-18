#include <iostream>
#include <thread>
#include <chrono>
#include <string>

#include "./features/api/api.hpp"
#include "./features/logger/logger.hpp"


int main() {
    Logger::init();

    const std::string address = "http://0.0.0.0:8080";
    EndlessAPI api(address);
    api.start();

    Logger::debug("Application started");

    while (true) {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }

    return 0;
}
