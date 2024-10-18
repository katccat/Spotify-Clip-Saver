import { useEffect, FC } from "react";
import { Link } from "react-router-dom";
import { RedirectToSpotify } from "../RedirectToSpotify";
import { getToken } from "../getToken";

const LoginPage: FC = () => {
  const handleLogin = async () => {
    console.log("handleLogin called!");
    await RedirectToSpotify();
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(code);

    if (code) {
      getToken(code); // Call getToken to exchange the authorization code for an access token
    }
  };

  useEffect(() => {}, []); // Empty dependency array to run only once when the component mounts

  return (
    <div>
      <button className="main-button" onClick={handleLogin}>
        <h3>Login!</h3>
      </button>
      <Link to="/home">
        <button className="main-button">
          <h3>Home Page!</h3>
        </button>
      </Link>
    </div>
  );
};

export default LoginPage;
