export const refreshToken = async (): Promise<void> => {
  const SPOTIFY_CLIENT_ID = "90fbdf7cd7f94940b7d90aef90c967a6";
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    console.error("No refresh token found.");
    return;
  }
  try {
    const response = await fetch("http://localhost:8080/api/spotify/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
        spotify_id: SPOTIFY_CLIENT_ID,
      }),
    });
    const data = await response.json();
    localStorage.setItem("refresh_token", data.refresh_token);
  } catch (error) {
    console.log(error);
  }
};
