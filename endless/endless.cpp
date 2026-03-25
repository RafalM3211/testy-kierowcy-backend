#include <iostream>
#include <thread>
#include <chrono>
#include <cpprest/http_listener.h>
#include <cpprest/json.h>

import testmodule;

using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

class EndlessAPI {
private:
    http_listener m_listener;

public:
    EndlessAPI(const std::string& address) : m_listener(address) {
        m_listener.support(methods::GET, std::bind(&EndlessAPI::handle_get, this, std::placeholders::_1));
    }

    void start() {
        m_listener.open().then([this]() {
            std::cout << "Listening on: " << m_listener.uri().to_string() << std::endl;
        }).wait();
    }

    void handle_get(http_request request) {
        ucout << "Received GET request" << std::endl;
        json::value response;
        response[U("message")] = json::value::string(U("UPDATED"));
        request.reply(status_codes::OK, response);
    }
};

int main() {
    const std::string address = "http://0.0.0.0:8080";
    EndlessAPI api(address);
    api.start();

    while (true) {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }

    return 0;
}
