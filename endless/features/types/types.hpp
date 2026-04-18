#pragma once

#include <string>

struct Question {
    int id;
    std::string content;

    // We don't need other question properties in this microservice
    /* char correctAnswer;
    int type;
    unsigned short value;
    std::string media;
    std::string a;
    std::string b;
    std::string c; */
};
