import React from "react";
import Container from "../components/general/Container";
import Logo from "../components/general/Logo";
import Login from "../components/credentials/Login";
import { useAuth } from "../hooks/auth.hook";
import Title from "../components/basics/Title";
import credentialsStyles from "../styles/credentials.module.css";

const LoginPage = () => {
  const { login, signInWithGoogle } = useAuth();

  return (
    <Container className={credentialsStyles.container}>
      <div className={credentialsStyles.formContainer}>
        <Logo />
        <Title>Login</Title>
        <Login login={login} signInWithGoogle={signInWithGoogle} />
      </div>
    </Container>
  );
};

export default LoginPage;
