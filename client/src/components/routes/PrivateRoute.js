import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";
import { AuthService } from "../../services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const { loading, tokenLoading, user } = useAuth();

  const isLoading = loading || tokenLoading;

  if (isLoading) return <div>Loading!!!!</div>;

  return (
    <Route
      {...rest}
      render={(props) => {
        const authorized = Boolean(user && AuthService.credentials.accessToken);
        console.log({ authorized });

        if (authorized) return <Component {...props} />;
        else
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location.pathname },
              }}
            />
          );
      }}
    />
  );
};

export default PrivateRoute;
