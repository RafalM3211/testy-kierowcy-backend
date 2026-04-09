#pragma once

#include <string>


class Logger {
public:
    void test();
    static void init();
    static void debug(std::string message);
    static void info(std::string message);
    static void warn(std::string message);
    static void error(std::string message);
};