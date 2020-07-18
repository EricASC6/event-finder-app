import React from "react";
import AuthComponent from "../auth/AuthComponent";
import { Route } from "react-router-dom";

const UnauthenticatedRoute = ({
  path,
  component,
  successRedirect = "/",
  ...props
}) => {
  return (
    <AuthComponent successRedirect={successRedirect}>
      {() => <Route path={path} component={component} {...props} />}
    </AuthComponent>
  );
};

export default UnauthenticatedRoute;
