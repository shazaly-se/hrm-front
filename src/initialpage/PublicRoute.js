import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";
function PublicRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = Cookies.get("token");
  console.log("this token", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/app/main/dashboard" />
      }
    />
  );
}

export default PublicRoute;