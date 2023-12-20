// EXTERNAL
import { JWTPayload, jwtVerify, SignJWT } from "jose";

const accessSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET!;
const originUrl = process.env.JWT_ORIGIN_URL!;

export type GenerateTokensResponse = {
  access: string;
  refresh: string;
};

export async function generateJWTs(
  userId: string,
  status: string
): Promise<GenerateTokensResponse> {
  const iat = Date.now();
  const fifteenMinutes = iat + 60 * 1000 * 15; // 1 minute
  const twoWeeks = iat + 3600 * 1000 * 24 * 14;

  const access = await new SignJWT({ status })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(Date.now())
    .setExpirationTime(fifteenMinutes)
    .setAudience(originUrl)
    .setIssuer(originUrl)
    .setSubject(userId)
    .sign(new TextEncoder().encode(accessSecret));

  const refresh = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(Date.now())
    .setExpirationTime(twoWeeks)
    .setAudience(originUrl)
    .setIssuer(originUrl)
    .setSubject(userId)
    .sign(new TextEncoder().encode(refreshSecret));

  return { access, refresh };
}

export async function validateAccessToken(
  token: string
): Promise<JWTPayload | null> {
  if (!accessSecret || !originUrl) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(accessSecret),
      {
        audience: originUrl,
      }
    );
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function validateRefreshToken(
  token: string
): Promise<JWTPayload | null> {
  if (!refreshSecret || !originUrl) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(refreshSecret),
      {
        audience: originUrl,
      }
    );
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
