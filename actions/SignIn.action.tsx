"use server";

// INTERNAL
import * as db from "../utils/db";

export default async function signIn(formData: FormData) {
  let email = formData.get("email");
  let pwd = formData.get("password");

  if (email && pwd) {
    email = email.toString();
    pwd = pwd.toString();

    return await db.login_subscriber(email, pwd);
  }
}
