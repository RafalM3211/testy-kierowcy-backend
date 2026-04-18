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
        spdlog::set_pattern("[%Y-%m-%d %H:%M:%S.%e] [%^%l%$] %v");
        spdlog::set_level(spdlog::level::debug); //change to info on production based on env variable in future
    }
}

void Logger::debug(std::string message){
    spdlog::debug(message);
};

void Logger::info(std::string message){
    spdlog::info(message);
};

void Logger::warn(std::string message){
    spdlog::warn(message);
};

void Logger::error(std::string message){
    spdlog::error(message);
};