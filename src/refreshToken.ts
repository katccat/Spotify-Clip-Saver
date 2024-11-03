export const refreshToken = async (): Promise<void> => {
  const SPOTIFY_CLIENT_ID = "d5695b7e4d344ab6abe136e567451ed1";
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
        spotify_ID: SPOTIFY_CLIENT_ID,
      }),
    });
    const data = await response.json();
    localStorage.setItem("refresh_token", data.refresh_token);
  } catch (error) {
    console.log(error);
  }
};
