import { FC } from "react";
import { Link } from "react-router-dom";
import { RedirectToSpotify } from "../redirectToSpotify";
import { getToken } from "../getToken";
import { checkToken } from "../checkToken";

const LoginPage: FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  //console.log("hello");
  const postLogin = async (code : string) => {
    const tokenExists = await checkToken();
    if (!tokenExists) await getToken(code);
  }
  if (code) {
    postLogin(code); // Call getToken to exchange the authorization code for an access token
  }
  const login = async () => {
    console.log("handleLogin called!");
    window.localStorage.clear();
    await RedirectToSpotify();
  };
  // Empty dependency array to run only once when the component mounts

  return (
    <div>
      <button className="main-button" onClick={login}>
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
