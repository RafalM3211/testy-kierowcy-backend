#pragma once

#include <cpprest/http_listener.h>
#include <cpprest/json.h>
#include <string>

using namespace web::http;

class Helpers{
public:
    static std::string getCorrelationId(http_request request);
};