import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          //  return <Redirect to="/login/signIn" />;
          return (
            <Redirect
              to={{
                pathname: "/login/signIn",
                state: { from: props.location }
              }}
            />
          );
          // state - данные к-ые нам необходимо сохранить к-ые мы получаем в данный момент времени
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};
ProtectedRoute.propTypes = {
  component: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  location: PropTypes.object
};

export default ProtectedRoute;
