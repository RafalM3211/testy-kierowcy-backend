#include "api.hpp"


using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

EndlessAPI::EndlessAPI(const std::string& address) : m_listener(address) {
    m_listener.support(methods::GET, std::bind(&EndlessAPI::handle_get, this, std::placeholders::_1));
}

void EndlessAPI::start() {
    m_listener.open().then([this]() {
        Logger::info("Listening on: " + m_listener.uri().to_string());
    }).wait();
}

void EndlessAPI::handle_get(http_request request) {
    Logger::info("Received GET request");

    json::value response;
    response[U("message")] = json::value::string(U("UPTATED"));
    
    request.reply(status_codes::OK, response);
}