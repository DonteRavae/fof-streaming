"use server";

// INTERNAL
import { AuthResponse } from "@/utils/interfaces";
import { EMAIL_VALIDATION, PWD_VALIDATION } from "@/utils/constants";
import * as db from "@/utils/db";

export default async function signUp(
  formData: FormData
): Promise<AuthResponse> {
  let email = formData.get("email");
  let pwd = formData.get("password");
  let pwdMatch = formData.get("passwordMatch");

  if (email && pwd && pwdMatch) {
    email = email.toString();
    pwd = pwd.toString();
    pwdMatch = pwdMatch.toString();

    if (
      !EMAIL_VALIDATION.test(email) &&
      !PWD_VALIDATION.test(pwd) &&
      !PWD_VALIDATION.test(pwdMatch)
    ) {
      return {
        ok: false,
        data: {
          message: "Invalid inputs",
          payload: null,
        },
      };
    }

    if (pwd !== pwdMatch) {
      return {
        ok: false,
        data: {
          message: "Passwords must match",
          payload: null,
        },
      };
    }

    return await db.register_subscriber(email, pwd);
  }
  return {
    ok: false,
    data: {
      message: "Server Error. Please try again later.",
      payload: null,
    },
  };
}
