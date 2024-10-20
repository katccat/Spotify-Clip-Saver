import { refreshToken } from "./RefreshToken.ts";

export const checkToken = async (): Promise<string | null> => {
  const accessToken = localStorage.getItem("access_token");
  const expiresAt = localStorage.getItem("expires_at");
  console.log(accessToken);
  console.log(expiresAt);

  if (!accessToken || !expiresAt) {
    console.error("No access token or expiration time found.");
    return null;
  }

  //   Check if the token is expired
  const now = Date.now();
  console.log(now);
  if (now >= parseInt(expiresAt)) {
    console.log("Token expired, refreshing...");
    await refreshToken();
    return localStorage.getItem("access_token"); // Return new access token
  }

  return accessToken; // Return current valid token
};
