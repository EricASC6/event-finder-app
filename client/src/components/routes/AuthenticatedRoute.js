import React from "react";
import AuthComponent from "../auth/AuthComponent";
import { Route } from "react-router-dom";

const AuthenticatedRoute = ({
  path,
  component,
  failureRedirect = "/login",
  ...props
}) => {
  return (
    <AuthComponent failureRedirect={failureRedirect}>
      {() => <Route path={path} component={component} {...props} />}
    </AuthComponent>
  );
};

export default AuthenticatedRoute;
