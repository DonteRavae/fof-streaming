// EXTERNAL
import jwt, { JwtPayload } from "jsonwebtoken";

const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const originUrl = process.env.JWT_ORIGIN_URL;

export function generateJWTs(userId: string) {
  if (!accessSecret || !refreshSecret || !originUrl)
    return { success: false, access: "", refresh: "" };

  const access = jwt.sign({}, accessSecret, {
    expiresIn: "15m",
    audience: originUrl,
    issuer: originUrl,
    subject: userId,
  });
  const refresh = jwt.sign({}, refreshSecret, {
    expiresIn: "14 days",
    audience: originUrl,
    issuer: originUrl,
    subject: userId,
  });

  return { success: true, access, refresh };
}

export function validateAccessToken(token: string): JwtPayload | null {
  if (!accessSecret || !originUrl) return null;

  try {
    let claims = jwt.verify(token, accessSecret, {
      audience: originUrl,
      issuer: originUrl,
    }) as JwtPayload;

    return claims;
  } catch (err) {
    return null;
  }
}

export function validateRefreshToken(token: string): JwtPayload | null {
  if (!refreshSecret || !originUrl) return null;

  try {
    let claims = jwt.verify(token, refreshSecret, {
      audience: originUrl,
      issuer: originUrl,
    }) as JwtPayload;

    return  claims;
  } catch (err) {
    return null;
  }
}
