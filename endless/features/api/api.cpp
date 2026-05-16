#include "api.hpp"

using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

EndlessAPI::EndlessAPI(const std::string& address, Tokenizer& _tokenizer): 
    m_listener(address), tokenizer(_tokenizer) {
    m_listener.support(methods::GET, std::bind(&EndlessAPI::handle_get, this, std::placeholders::_1));
    m_listener.support(methods::POST, std::bind(&EndlessAPI::handle_post, this, std::placeholders::_1));
}

void EndlessAPI::start() {
    m_listener.open().then([this]() {
        Logger::info("Listening on: " + m_listener.uri().to_string());
    }).wait();
}

void EndlessAPI::handle_get(http_request request) {
    auto path = uri::decode(request.relative_uri().path());
    std::string routeName = utility::conversions::to_utf8string(path);
    Logger::info("Received GET request on " + routeName, Helpers::getCorrelationId(request));

    if(path == U("/get-endless-question")){
        Logger::info("route: get-endless-question", Helpers::getCorrelationId(request));
    };

    json::value response;
    response[U("message")] = json::value::string(U("UPTATED"));
    
    request.reply(status_codes::OK, response);
}

void EndlessAPI::handle_post(http_request request) {
    auto path = uri::decode(request.relative_uri().path());
    std::string routeName = utility::conversions::to_utf8string(path);

    Logger::info("Received POST request on " + routeName, Helpers::getCorrelationId(request));

    if(path == U("/get-endless-question")){
        Logger::debug("route: get-endless-question", Helpers::getCorrelationId(request));
        handleGetQuestion(request, tokenizer);
        return;
    };

    if(path == U("/sync-questions")){
        Logger::debug("route: sync-questions", Helpers::getCorrelationId(request));
        handleSync(request, tokenizer);
        return;
    };

    json::value response;
    response[U("message")] = json::value::string(U("synced"));
    
    request.reply(status_codes::OK, response);
}