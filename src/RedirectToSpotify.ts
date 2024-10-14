import { generateRandomString, sha256, base64encode } from "./pkce.ts";

async function RedirectToSpotify(): Promise<string> {
  const SPOTIFY_CLIENT_ID = "d5695b7e4d344ab6abe136e567451ed1";

  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);
  const redirectUri = "http://localhost:8080";

  const scope = "user-read-private user-read-email";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  // generated in the previous step
  window.localStorage.setItem("code_verifier", codeVerifier);

  const params = {
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  return code;
}
export { RedirectToSpotify };
