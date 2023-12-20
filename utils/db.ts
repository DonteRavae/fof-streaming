// NEXT.JS
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// INTERNAL
import { generateJWTs, validateRefreshToken } from "./jwt";
import {
  AuthResponse,
  IAuth,
  IProfile,
  IStripeDetails,
  STRIPE_STATUS,
  Subscriber,
} from "./interfaces";
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
async function find_subscriber_by_email(email: string): Promise<IAuth | null> {
  try {
    let [result] = await pool.query<IAuth[]>(
      `SELECT 
        u.ref AS ref, 
        u.hash AS hash, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', p.id,
            'name', p.name
          )
        ) AS profiles,
        s.status AS status 
      FROM auth AS u 
      LEFT JOIN stripe AS s 
      ON (u.ref = s.auth_id) 
      LEFT JOIN profiles AS p 
      ON (u.ref = p.auth_id) 
      WHERE email = ?
      GROUP BY p.id, s.status`,
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

  const existingUser = await find_subscriber_by_email(email);
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
    const tokens = await generateJWTs(userRef, STRIPE_STATUS.CREATED);

    conn = await pool.getConnection();
    await conn.beginTransaction();

    // Create Auth object
    await conn.query(
      "INSERT INTO auth (id, ref, email, hash, refresh_token) VALUES (?, ?, ?, ?, ?)",
      [userId, userRef, email, pwHash, tokens.refresh]
    );

    // Create Profile object
    const profileId = uuidv4();
    await conn.query("INSERT INTO profiles (id, auth_id) VALUES (?, ?)", [
      profileId,
      userRef,
    ]);

    // Create Stripe object
    const stripeId = uuidv4();
    await conn.query("INSERT INTO stripe (id, auth_id) VALUES (?, ?)", [
      stripeId,
      userRef,
    ]);

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
      status: STRIPE_STATUS.CREATED,
    };

    cookies().set({
      name: "ffrt",
      value: tokens.refresh,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24, // 1 Day
      sameSite: "strict",
    });

    cookies().set({
      name: "ffat",
      value: tokens.access,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 20,
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
      const tokens = await generateJWTs(user.ref, user.status);

      conn = await pool.getConnection();
      await conn.beginTransaction();

      await conn.query("UPDATE auth SET refresh_token = ? WHERE ref = ?", [
        tokens.refresh,
        user.ref,
      ]);

      await conn.commit();

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
        maxAge: 60 * 20,
        sameSite: "strict",
      });

      return {
        ok: true,
        data: {
          message: "Successful login",
          payload: {
            id: user.ref,
            email,
            profiles: user.profiles,
            status: user.status,
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
    let [result] = await pool.query<IAuth[]>(
      "SELECT ref FROM auth WHERE refresh_token = ?",
      [token]
    );
    if (result.length < 1) return;
    // Delete refresh token from database
    await pool.query(
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
      `SELECT 
        u.ref AS ref, 
        u.email AS email, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', p.id,
            'name', p.name
          )
        ) AS profiles,
        s.status AS status 
      FROM auth AS u 
      LEFT JOIN stripe AS s 
      ON (u.ref = s.auth_id) 
      LEFT JOIN profiles AS p 
      ON (u.ref = p.auth_id) 
      WHERE refresh_token = ?
      GROUP BY u.ref, p.id, s.status`,
      [token]
    );
    if (result.length < 1) return null;

    let claims = await validateRefreshToken(token);
    if (!claims) return null;

    let user = result[0];
    if (user.ref !== claims.sub) return null;
    const tokens = await generateJWTs(user.ref, user.status);

    let [profiles] = await conn.query<IProfile[]>(
      "SELECT id, name FROM profiles WHERE auth_id = ?",
      [user.ref]
    );

    if (profiles.length < 1) redirect("/profiles/edit");

    await conn.commit();

    cookies().set({
      name: "ffat",
      value: tokens.access,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 20,
      sameSite: "strict",
    });

    return {
      id: user.ref,
      email: user.email,
      profiles,
      status: user.status,
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
      `SELECT 
        u.email AS email, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', p.id,
            'name', p.name
          )
        ) AS profiles,
        s.status AS status 
      FROM auth AS u 
      LEFT JOIN stripe AS s 
      ON (u.ref = s.auth_id) 
      LEFT JOIN profiles AS p 
      ON (u.ref = p.auth_id) 
      WHERE ref = ?
      GROUP BY p.id, s.status`,
      [id]
    );

    if (users.length < 1) return null;
    let user = users[0];

    const [profiles] = await conn.query<IProfile[]>(
      "SELECT id, name FROM profiles WHERE auth_id = ?",
      [id]
    );

    await conn.commit();

    let tokens = await generateJWTs(id, user.status);

    cookies().set({
      name: "ffat",
      value: tokens.access,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 15,
      sameSite: "strict",
    });

    return {
      id,
      email: user.email,
      profiles,
      status: user.status,
    };
  } catch (error) {
    console.error(error);
    if (conn) await conn.rollback();
    return null;
  } finally {
    if (conn) conn.release();
  }
}

export async function update_user_subscription_status(
  userEmail: string,
  customerId: string,
  subscriptionId: string,
  status: string // May opt to change status to an enum value
) {
  let conn = null;

  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const [result] = await conn.query<IAuth[]>(
      "SELECT ref FROM auth WHERE email = ?",
      [userEmail]
    );

    if (result.length < 1) return;

    const user = result[0];

    await conn.query(
      "UPDATE stripe SET customer_id = ?, subscription_id = ?, status = ? WHERE auth_id = ?",
      [customerId, subscriptionId, status, user.ref]
    );

    await conn.commit();
  } catch (error) {
    console.error(error);
    if (conn) await conn.rollback();
  } finally {
    if (conn) conn.release();
  }
}

export async function getSubscriptionId(userId: string): Promise<string> {
  const [results] = await pool.query<IStripeDetails[]>(
    "SELECT subscription_id as subscriptionId FROM stripe WHERE auth_id = ?",
    [userId]
  );

  if (results.length < 1) return "";

  const stripeAccount = results[0];

  return stripeAccount.subscriptionId;
}

export async function getStripeCustomerId(
  userId: string
): Promise<string | undefined> {
  const [results] = await pool.query<IStripeDetails[]>(
    "SELECT customer_id as customerId FROM stripe WHERE auth_id = ?",
    [userId]
  );
  if (results.length < 1) return;

  return results[0].customerId;
}
