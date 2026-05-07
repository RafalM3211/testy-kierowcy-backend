#include "helpers.hpp"

std::string Helpers::getCorrelationId(http_request request){
    auto headers = request.headers();
    std::string correlationId = "UNKNOWN";

    if (headers.has(U("X-Correlation-ID"))) {
        correlationId = utility::conversions::to_utf8string(headers[U("X-Correlation-ID")]);
    }

    return correlationId;
}