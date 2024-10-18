const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's origin
  })
);
app.get("/api/spotify/me", async (req, res) => {
  const authHeader = req.headers.authorization;
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

app.listen(8080, () => console.log("Server running on port 8080"));
