#pragma once

#include <string>
#include <cstdlib>

class Logger {
private:
    static std::string prepareCorIdHeader(std::string correlationId);
public:
    void test();
    static void init();
    static void debug(std::string message, std::string correlationId = "");
    static void info(std::string message, std::string correlationId = "");
    static void warn(std::string message, std::string correlationId = "");
    static void error(std::string message, std::string correlationId = "");
};