#pragma once
#include <cpprest/http_listener.h>
#include "../tokenizer/tokenizer.hpp"

void handleSync(web::http::http_request request, Tokenizer& tokenizer);