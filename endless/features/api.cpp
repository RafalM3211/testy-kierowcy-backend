#include "api.hpp"

using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

EndlessAPI::EndlessAPI(const std::string& address) : m_listener(address) {
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
    Logger::info("Received GET request on " + routeName);

    if(path == U("/get-endless-question")){
        Logger::info("route: get-endless-question");
    };

    json::value response;
    response[U("message")] = json::value::string(U("UPTATED"));
    
    request.reply(status_codes::OK, response);
}

void EndlessAPI::handle_post(http_request request) {
    auto path = uri::decode(request.relative_uri().path());
    std::string routeName = utility::conversions::to_utf8string(path);
    Logger::info("Received POST request on " + routeName);

    if(path == U("/sync-questions")){
        Logger::debug("route: sync-questions");
        try{
            json::value body = request.extract_json().get();
            Logger::debug( body.is_array()? "array": "not" );


            request.reply(status_codes::OK, body);
        }
        catch (const web::json::json_exception& e) {
            Logger::error(std::string("Invalid JSON format: ") + e.what());
            request.reply(status_codes::BadRequest, U("Invalid JSON body"));
        }
        catch (const std::exception& e) {
            Logger::error(std::string("HTTP Error extracting JSON: ") + e.what());
            request.reply(status_codes::BadRequest, U("Failed to read JSON. Did you forget Content-Type: application/json?"));
        }
    };

    json::value response;
    response[U("message")] = json::value::string(U("synced"));
    
    request.reply(status_codes::OK, response);
}
