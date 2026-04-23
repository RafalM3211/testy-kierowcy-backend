#pragma once

#include <cpprest/http_listener.h>
#include <cpprest/json.h>

#include "../tokenizer/tokenizer.hpp"
#include "../logger/logger.hpp"
#include "../types/types.hpp"
#include "../scores/scores.hpp"

void handleGetQuestion(web::http::http_request, Tokenizer&, ScoreEngine&);