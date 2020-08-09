import React from "react";
import Container from "../components/general/Container";
import Logo from "../components/general/Logo";
import Signup from "../components/credentials/Signup";
import { useAuth } from "../hooks/auth.hook";
import Title from "../components/basics/Title";
import credentialsStyles from "../styles/credentials.module.css";

const SignupPage = () => {
  const { signup, signInWithGoogle } = useAuth();

  return (
    <Container className={credentialsStyles.container}>
      <div className={credentialsStyles.formContainer}>
        <Logo />
        <Title>Sign Up</Title>
        <Signup signup={signup} signInWithGoogle={signInWithGoogle} />
      </div>
    </Container>
  );
};

export default SignupPage;
