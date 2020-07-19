import React, { useState } from "react";
import Form from "../general/Form";
import FormField from "../general/FormField";
import { ReactComponent as EmailIcon } from "../../icons/email.svg";
import { ReactComponent as PasswordIcon } from "../../icons/password.svg";
import ErrorContainer from "../general/ErrorContainer";
import { Link } from "react-router-dom";
import GoogleOauthBtn from "./GoogleOauthBtn";
import { history } from "../../services/history";
import credentialsStyles from "../../styles/credentials.module.css";

const Login = ({ login, signInWithGoogle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  return (
    <Form
      onSubmit={() => {
        login(email, password)
          .then(() => history.push("/"))
          .catch((err) => {
            setError(err.message);
          });
      }}
    >
      <FormField
        label="Email"
        placeholder="Email"
        name="email"
        LeadingIcon={EmailIcon}
        onChange={(value) => setEmail(value)}
      />
      <FormField
        label="Password"
        placeholder="Password"
        name="password"
        LeadingIcon={PasswordIcon}
        onChange={(value) => setPassword(value)}
      />
      {error && <ErrorContainer error={error} />}
      <div className={credentialsStyles.formBar}>
        <button className={credentialsStyles.btn}>Login</button>
        <Link className={credentialsStyles.link} to="/signup">
          Sign Up
        </Link>
      </div>

      <div className={credentialsStyles.orSeperator}>or</div>
      <GoogleOauthBtn
        login
        onClick={(e) => {
          e.preventDefault();
          signInWithGoogle().catch((err) => setError(err.message));
        }}
      />
    </Form>
  );
};

export default Login;
