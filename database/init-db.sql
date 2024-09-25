CREATE EXTENSION pgcrypto;

CREATE TABLE IF NOT EXISTS questions(
    "id" SMALLINT PRIMARY KEY,
    "content" VARCHAR NOT NULL,
    "correctAnswer" CHAR(1) NOT NULL,
    "type" VARCHAR(11) NOT NULL,
    "value" SMALLINT NOT NULL,
    "media" VARCHAR,
    "A" VARCHAR,
    "B" VARCHAR,
    "C" VARCHAR
);

CREATE TABLE IF NOT EXISTS questions_categories(
    "question_id" SMALLINT ,
    "category" VARCHAR(2) NOT NULL,
    CONSTRAINT fk_question FOREIGN KEY(question_id) REFERENCES questions(id)
);

CREATE TABLE IF NOT EXISTS users(
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR NOT NULL UNIQUE,
    "password" VARCHAR NOT NULL,
    "name" VARCHAR
);

CREATE TABLE IF NOT EXISTS users_questions_answer(
    "user_id" INT,
    "question_id" SMALLINT,
    "isAnsweredCorrectly" BOOLEAN, 
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_question FOREIGN KEY(question_id) REFERENCES questions(id)
);


COPY questions FROM '/data-import/questions.txt' WITH DELIMITER '|';
COPY questions_categories FROM '/data-import/questions_categories.txt' WITH DELIMITER '|';
COPY users FROM '/data-import/users.txt' WITH DELIMITER '|';
COPY users_questions_answer FROM '/data-import/users_questions_answer.txt' WITH DELIMITER '|';
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

CREATE MATERIALIZED VIEW question_count AS SELECT COUNT(*) AS question_count FROM questions;