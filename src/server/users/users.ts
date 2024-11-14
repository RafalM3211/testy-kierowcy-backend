import { getUsersWhere, insertUser } from "../db/dbApi";
import { withoutProperty } from "../helpers";

import type { User } from "../../types/globalTypes";

async function getOneUserWhere(conditions: string, values: any[]) {
  const users = await getUsersWhere(conditions, values);

  let user: User | null = null;

  if (users.length > 1) {
    throw `Too many rows returned: ${users.length}. Should return only one user. There's an email duplicate in the table`;
  } else if (users.length === 1) {
    const withPassword = users[0];
    user = withoutProperty(withPassword, "password");
  }

  return user;
}

export async function getUserByCredentials(email: string, password: string) {
  const user = await getOneUserWhere(
    "email=$1 AND password=crypt($2, password)",
    [email, password]
  );
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await getOneUserWhere("email=$1", [email]);
  return user;
}

export async function getUserById(id: number) {
  const user = await getOneUserWhere("id=$1", [id]);
  return user;
}

export async function addUser(
  email: string,
  password: string,
  userName?: string | undefined
) {
  const trimmedName = userName?.trim() || null;
  return await insertUser(email, password, trimmedName);
}
