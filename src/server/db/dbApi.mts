import dotEnv from "dotenv";
import pg from "pg";
import type { QueryResultRow, QueryResult } from "pg";
import type { RawQuestionRecord, UserWithPassword } from "../types.mjs";
import { AnswersStatistics, Question, User } from "../../types/globalTypes";

dotEnv.config();
const { Pool } = pg;
const pool = new Pool();

async function query<T extends QueryResultRow>(
  sql: string,
  values?: any[]
): Promise<QueryResult<T>> {
  const res = await pool.query<T>(sql, values);

  return res;
}

//todo: rozdzielic query na insertQuery i query. Query to bedzie to co powyżej a insertQuery bedzie robil dodatkowo sanitacje inputa.
//todo: przeniesc funkcje ponizej do osobnych plikow query w danych folderach z featurow.

export async function getQuestionsWhere(conditions: string, values?: any[]) {
  const sql =
    "SELECT * FROM (questions INNER JOIN questions_categories ON id=question_id) WHERE " +
    conditions;
  const res = await query<RawQuestionRecord>(sql, values);
  const questions = res.rows;

  return questions;
}

export async function saveQuestionAnswerWith(
  userId: User["id"],
  questionId: Question["id"],
  isCorrect: boolean
) {
  const sql = "INSERT INTO users_questions_answer VALUES ($1, $2, $3)";

  await query(sql, [userId, questionId, isCorrect]);
}

export async function getQuestionCount() {
  const sql = "SELECT question_count FROM question_count;";
  const res = await query(sql);
  const question_count = res.rows[0].question_count as number;

  return question_count;
}

export async function getCorrectStatisticsByUserId(
  userId: User["id"]
): Promise<Omit<AnswersStatistics, "unanswered">> {
  const sql =
    'SELECT "isAnsweredCorrectly", COUNT(*) FROM users_questions_answer WHERE user_id=$1 GROUP BY "isAnsweredCorrectly";';
  const res = await query(sql, [userId]);

  let wrong: string = "0";
  let correct: string = "0";
  if (res.rowCount != 0) {
    if (res.rows[0].isAnsweredCorrectly === false) {
      wrong = res.rows[0].count;
      correct = res.rows[1]?.count || 0;
    } else {
      correct = res.rows[0].count;
      wrong = res.rows[1]?.count || 0;
    }
  }

  return { correct: parseInt(correct), wrong: parseInt(wrong) };
}

export async function getUsersWhere(conditions: string, values?: any[]) {
  const sql = "SELECT * FROM users WHERE " + conditions;
  const res = await query<UserWithPassword>(sql, values);
  const users = res.rows;

  return users;
}

export async function insertUser(
  email: string,
  password: string,
  userName: string | null
) {
  const sql = `INSERT INTO users (email, password${
    !!userName ? ", name" : ""
  }) VALUES (
    $1, crypt($2, gen_salt('bf'))${!!userName ? ", $3" : ""}
  )
  RETURNING *;`;

  const res = await query(
    sql,
    [email, password, userName].filter((v) => !!v)
  );

  return res.rows[0] as UserWithPassword;
}
