import React from "react";
import { ReactComponent as GoogleIcon } from "../../icons/google.svg";
import credentialsStyles from "../../styles/credentials.module.css";

const GoogleOauthBtn = ({ signUp, login, onClick }) => {
  const btnContent = signUp
    ? "Sign Up With Google"
    : login
    ? "Login With Google"
    : "Google";

  return (
    <button className={credentialsStyles.oauthGoogleBtn} onClick={onClick}>
      <GoogleIcon style={{ marginRight: "0.5rem" }} />
      {btnContent}
    </button>
  );
};

export default GoogleOauthBtn;
