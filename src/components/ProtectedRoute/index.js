import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => state.authorizationReducer);
  return (
    <Route
      {...rest}
      render={(props) =>
        user.token || localStorage.getItem("user") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

export default ProtectedRoute;
