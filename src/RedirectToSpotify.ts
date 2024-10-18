import { generateRandomString, sha256, base64encode } from "./pkce.ts";

export const RedirectToSpotify = async (): Promise<void> => {
  const SPOTIFY_CLIENT_ID = "d5695b7e4d344ab6abe136e567451ed1";

  // Generate code verifier and challenge
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);
  const redirectUri = "http://localhost:5173/";

  // Store code verifier for later
  window.localStorage.setItem("code_verifier", codeVerifier);

  // Build the Spotify authorization URL
  const scope = "user-read-private user-read-email";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const params = {
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();

  // Redirect to Spotify login
  window.location.href = authUrl.toString();
};
