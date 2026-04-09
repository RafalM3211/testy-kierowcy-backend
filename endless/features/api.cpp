#include "api.hpp"


using namespace web;
using namespace web::http;

EndlessAPI::EndlessAPI(const std::string& address) : m_listener(address) {
    m_listener.support(methods::GET, std::bind(&EndlessAPI::handle_get, this, std::placeholders::_1));
}

void EndlessAPI::start() {
    m_listener.open().then([this]() {
        std::cout << "Listening on: " << m_listener.uri().to_string() << std::endl;
    }).wait();
}

void EndlessAPI::handle_get(http_request request) {
    std::cout << "Received GET request" << std::endl;

    json::value response;
    response[U("message")] = json::value::string(U("UPTATED"));
    
    request.reply(status_codes::OK, response);
}