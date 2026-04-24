/* module;

#include <iostream>
#include <fstream>
#include <string>

export module env;


class Env {
private:
    const std::string envFilePath;
public:
    Env(string _envFilePath): envFilePath(_envFilePath) {
        std::ifstream envFile(envFilePath);

        std::string line;
        while(getline(envFile, line)){
            
        }
    };


} */