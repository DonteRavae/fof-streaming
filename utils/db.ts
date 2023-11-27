// NEXT.JS
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// INTERNAL
import { generateJWTs, validateRefreshToken } from "./jwt";
import { AuthResponse, IAuth, IProfile, Subscriber } from "./interfaces";
// EXTERNAL
import bcrypt from "bcrypt";
import { ulid } from "ulid";
import mysql from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  waitForConnections: true,
});

export default pool;

// HELPERS

async function does_user_exist(email: string): Promise<boolean> {
  try {
    let [result] = await pool.execute<IAuth[]>(
      "SELECT id FROM auth WHERE email = ?",
      [email]
    );

    if (result.length) return true;
  } catch (error) {
    console.error(error);
  }

  return false;
}

async function find_subscriber_by_email(email: string): Promise<IAuth | null> {
  try {
    let [result] = await pool.execute<IAuth[]>(
      "SELECT ref, hash FROM auth WHERE email = ?",
      [email]
    );

    if (result.length < 1) return null;
    return result[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

// HANDLERS

export async function register_subscriber(
  email: string,
  password: string
): Promise<AuthResponse> {
  let conn = null;

  const existingUser = await does_user_exist(email);
  if (existingUser) {
    return {
      ok: false,
      data: {
        message: "User already exists.",
        payload: null,
      },
    };
  }

  try {
    const userId = uuidv4();
    const userRef = ulid();
    const pwHash = await bcrypt.hash(password, 15);
    const tokens = generateJWTs(userRef);

    conn = await pool.getConnection();
    await conn.beginTransaction();

    await conn.query(
      "INSERT INTO auth (id, ref, email, hash, refresh_token) VALUES (?, ?, ?, ?, ?)",
      [userId, userRef, email, pwHash, tokens.refresh]
    );

    const profileId = uuidv4();

    let result = await conn.query(
      "INSERT INTO profiles (id, auth_id) VALUES (?, ?)",
      [profileId, userRef]
    );

    await conn.commit();

    let user: Subscriber = {
      id: userRef,
      email: email,
      profiles: [
        {
          id: profileId,
          name: "Me",
        },
      ],
    };

    cookies().set({
      name: "ffrt",
      value: tokens.refresh,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
    });

    cookies().set({
      name: "ffat",
      value: tokens.access,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 14,
      sameSite: "strict",
    });

    return {
      ok: true,
      data: {
        message: "Subscriber created successfully",
        payload: user,
      },
    };
  } catch (error) {
    console.error(error);
    if (conn) await conn.rollback();
  } finally {
    if (conn) conn.release();
  }

  return {
    ok: false,
    data: {
      message: "Server Error. Please try again.",
      payload: null,
    },
  };
}

export async function login_subscriber(
  email: string,
  password: string
): Promise<AuthResponse> {
  let conn = null;

  try {
    let user = await find_subscriber_by_email(email);
    if (!user) {
      return {
        ok: false,
        data: {
          message: "Invalid email or password. Please try again.",
          payload: null,
        },
      };
    }

    // If passwords match...
    if (await bcrypt.compare(password, user.hash)) {
      const tokens = generateJWTs(user.ref);

      conn = await pool.getConnection();
      await conn.beginTransaction();

      await conn.query("UPDATE auth SET refresh_token = ? WHERE ref = ?", [
        tokens.refresh,
        user.ref,
      ]);

      let [profiles] = await conn.query<IProfile[]>(
        "SELECT id, name FROM profiles WHERE auth_id = ?",
        [user.ref]
      );

      await conn?.commit();

      http: cookies().set({
        name: "ffrt",
        value: tokens.refresh,
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24,
        sameSite: "strict",
      });

      cookies().set({
        name: "ffat",
        value: tokens.access,
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 14,
        sameSite: "strict",
      });

      return {
        ok: true,
        data: {
          message: "Successful login",
          payload: {
            id: user.ref,
            email,
            profiles,
          },
        },
      };
    } else {
      return {
        ok: false,
        data: {
          message: "Invalid email or password. Please try again.",
          payload: null,
        },
      };
    }
  } catch (error) {
    console.error(error);
    if (conn) await conn.rollback();
  } finally {
    if (conn) conn.release();
  }
  return {
    ok: false,
    data: {
      message: "Server Error. Please try again.",
      payload: null,
    },
  };
}

export async function logout_subscriber(token: string) {
  try {
    // Is refresh token in database
    let [result] = await pool.execute<IAuth[]>(
      "SELECT ref FROM auth WHERE refresh_token = ?",
      [token]
    );
    if (result.length < 1) return;
    // Delete refresh token from database
    await pool.execute(
      "UPDATE auth SET refresh_token = ? WHERE refresh_token = ?",
      ["", token]
    );
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      data: {
        message: "Server Error. Please try again.",
        payload: null,
      },
    };
  }
}

export async function refresh(token: string): Promise<Subscriber | null> {
  let conn = null;

  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    let [result] = await conn.query<IAuth[]>(
      "SELECT ref, email FROM auth WHERE refresh_token = ?",
      [token]
    );
    if (result.length < 1) return null;

    let claims = validateRefreshToken(token);
    if (!claims) return null;

    let user = result[0];
    if (user.ref !== claims.sub) return null;
    const tokens = generateJWTs(user.ref);

    let [profiles] = await conn.query<IProfile[]>(
      "SELECT id, name FROM profiles WHERE auth_id = ?",
      [user.ref]
    );

    if (profiles.length < 1) redirect("/access/signin");

    await conn.commit();

    cookies().set({
      name: "ffat",
      value: tokens.access,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 14,
      sameSite: "strict",
    });

    return {
      id: user.ref,
      email: user.email,
      profiles,
    };
  } catch (error) {
    console.log(error);
    if (conn) await conn.rollback();
  } finally {
    if (conn) conn.release();
  }
  return null;
}

export async function find_subscriber_by_id(
  id: string
): Promise<Subscriber | null> {
  let conn = null;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const [users] = await conn.query<IAuth[]>(
      "SELECT email FROM auth WHERE ref = ?",
      [id]
    );

    if (users.length < 1) return null;
    let user = users[0];

    const [profiles] = await conn.query<IProfile[]>(
      "SELECT id, name FROM profiles WHERE auth_id = ?",
      [id]
    );

    await conn.commit();

    return {
      id,
      email: user.email,
      profiles,
    };
  } catch (error) {
    console.error(error);
    if (conn) await conn.rollback();
    return null;
  } finally {
    if (conn) conn.release();
  }
}
