#pragma once

#include "../logger/logger.hpp"

#include <cpprest/http_listener.h>
#include <cpprest/json.h>
#include <string>
#include <iostream>

using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

class EndlessAPI {
private:
    http_listener m_listener;

public:
    EndlessAPI(const std::string& address);
    void start();
    void handle_get(http_request request);
    void handle_post(http_request request);
};