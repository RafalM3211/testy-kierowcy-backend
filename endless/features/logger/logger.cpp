#include "logger.hpp"

#include <spdlog/spdlog.h>
#include <spdlog/sinks/stdout_color_sinks.h>

void Logger::test(){
    spdlog::info("TEST");
};

void Logger::init(){
    if (!spdlog::get("console")) {
        auto console_logger = spdlog::stdout_color_mt("consolasde");
        spdlog::set_default_logger(console_logger);
        spdlog::set_pattern("[%^%l%$] %v");
        spdlog::set_level(spdlog::level::debug); //change to info on production based on env variable in future
    }
}

void Logger::debug(std::string message, std::string correlationId){
    spdlog::debug(prepareCorIdHeader(correlationId) + message);
};

void Logger::info(std::string message, std::string correlationId){
    spdlog::info(prepareCorIdHeader(correlationId) + message);
};

void Logger::warn(std::string message, std::string correlationId){
    spdlog::warn(prepareCorIdHeader(correlationId) + message);
};

void Logger::error(std::string message, std::string correlationId){
    spdlog::error(prepareCorIdHeader(correlationId) + message);
};

std::string Logger::prepareCorIdHeader(std::string correlationId){
    std::string corId = correlationId==""? "UNKNOWN": correlationId;
    return "[correlationID: " + corId + "] ";
}