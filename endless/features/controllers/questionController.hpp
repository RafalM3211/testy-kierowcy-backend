#pragma once

#include <cpprest/http_listener.h>
#include <cpprest/json.h>

#include "../tokenizer/tokenizer.hpp"
#include "../logger/logger.hpp"
#include "../types/types.hpp"
#include "../scoreEngine/scoreEngine.hpp"
#include "../drawer/drawer.hpp"
#include "../helpers/helpers.hpp"

void handleGetQuestion(web::http::http_request, Tokenizer&);