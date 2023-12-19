"use server";

// INTERNAL
import * as db from "../utils/db";
import { AuthResponse } from "@/utils/interfaces";

export default async function signIn(formData: FormData): Promise<AuthResponse> {
  let email = formData.get("email");
  let pwd = formData.get("password");

  if (email && pwd) {
    email = email.toString();
    pwd = pwd.toString();

    return await db.login_subscriber(email, pwd);
  }

  return {
    ok: false,
    data: {
      message: "Please enter valid inputs.",
      payload: null
    }
  }
}
