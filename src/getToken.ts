export const getToken = async (code: string): Promise<void> => {
  const SPOTIFY_CLIENT_ID = "d5695b7e4d344ab6abe136e567451ed1";
  const codeVerifier = localStorage.getItem("code_verifier");
  const redirectUri = "http://localhost:5173/";
  const url = "https://accounts.spotify.com/api/token";

  console.log("getToken has been called!");
  if (!codeVerifier) {
    throw new Error("Code verifier not found in local storage.");
  }
  console.log(code);
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  try {
    const response = await fetch(url, payload);

    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }

    const data = await response.json();

    // Calculate expiration time in milliseconds (current time + expires_in value)
    const expirationTime = Date.now() + data.expires_in * 1000;

    // Store access token, refresh token, and expiration time
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("expires_at", expirationTime.toString());

    if (data.refresh_token) {
      localStorage.setItem("refresh_token", data.refresh_token);
    }
    console.log("Access token received:", data.access_token);
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};
