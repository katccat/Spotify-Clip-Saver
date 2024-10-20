import { useEffect, useState, FC } from "react";
import { checkToken } from "../checkToken";

const HomePage: FC = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await checkToken();

      if (token) {
        // Fetch Spotify data using the valid token
        try {
          const response = await fetch("http://localhost:8080/api/spotify/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to your Spotify Dashboard</h1>
      {userData && (
        <div>
          <h3>{JSON.stringify(userData)}</h3>
        </div>
      )}
    </div>
  );
};

export default HomePage;
