import { cookies } from "next/headers";
import { validateAccessToken } from "./jwt";

export const getAccessTokenClaims = async () => {
      const accessCookie = cookies().get("ffat");
      if (!accessCookie) return null;
      return await validateAccessToken(accessCookie.value);
}