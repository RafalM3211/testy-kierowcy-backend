#include <iostream>
#include <thread>
#include <chrono>
#include <string>

#include "./features/api.hpp"

import testmodule;


int main() {
    const std::string address = "http://0.0.0.0:8080";
    EndlessAPI api(address);
    api.start();

    while (true) {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }

    return 0;
}
