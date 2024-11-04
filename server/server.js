const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's origin
  })
);
app.use(bodyParser.json());

app.get("/api/spotify/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
  }
  const token = authHeader.split(" ")[1];

  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from Spotify" });
  }
});

app.post("/api/spotify/refresh", async (req, res) => {
  const refresh_Token = req.body.refresh_token;
  console.log(`${refresh_Token}\n`);
  const spotify_id = req.body.spotify_id;
  console.log(spotify_id);

  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: spotify_id,
      grant_type: "refresh_token",
      refresh_token: refresh_Token,
    }),
  };

  try {
    const response = await fetch(url, payload);
    console.log(response);

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
});

app.listen(8080, () => console.log("Server running on port 8080"));
