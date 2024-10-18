export const refreshToken = async (): Promise<void> => {
  const SPOTIFY_CLIENT_ID = "d5695b7e4d344ab6abe136e567451ed1";
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    console.error("No refresh token found.");
    return;
  }

  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  };

  try {
    const response = await fetch(url, payload);

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();

    // Calculate new expiration time
    const expirationTime = Date.now() + data.expires_in * 1000;

    // Store new access token and expiration time
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("expires_at", expirationTime.toString());

    console.log("Token refreshed:", data.access_token);
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};
