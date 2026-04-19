#pragma once
#include <cpprest/http_listener.h>
#include "../tokenizer/tokenizer.hpp"

void handleGetQuestion(web::http::http_request request, Tokenizer& tokenizer);