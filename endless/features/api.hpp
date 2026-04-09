#pragma once

#include <cpprest/http_listener.h>
#include <cpprest/json.h>
#include <string>
#include <iostream>

class EndlessAPI {
private:
    http_listener m_listener;

public:
    EndlessAPI(const std::string& address);
    void start();
    void handle_get(http_request request);
};