import React from "react";
import { useAuth } from "../../hooks/auth.hook";
import { Redirect } from "react-router-dom";
import { getAccessToken } from "../../services/auth";

const AuthComponent = ({ children, successRedirect, failureRedirect }) => {
  const auth = useAuth();
  const { loading, user } = auth;

  if (loading) return <div>Loading!!!!</div>;

  const authenticated = Boolean(user && getAccessToken());

  if (authenticated && successRedirect)
    return <Redirect to={successRedirect} />;

  if (!authenticated && failureRedirect)
    return <Redirect to={failureRedirect} />;

  return children(auth);
};

export default AuthComponent;
