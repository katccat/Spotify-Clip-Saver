import React, { FC } from "react";
import { RedirectToSpotify } from "../RedirectToSpotify.ts";

const LoginPage: FC = () => {
  return (
    <div>
      <form onSubmit={await RedirectToSpotify()}>
        <button>
          <h3>login</h3>
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
