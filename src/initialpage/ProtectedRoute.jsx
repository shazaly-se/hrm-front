import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";
function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = Cookies.get("token");

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;