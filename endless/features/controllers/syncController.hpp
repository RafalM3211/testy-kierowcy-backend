#pragma once

#include <cpprest/http_listener.h>
#include <cpprest/json.h>

#include "../tokenizer/tokenizer.hpp"
#include "../logger/logger.hpp"
#include "../types/types.hpp"

void handleSync(web::http::http_request request, Tokenizer& tokenizer);