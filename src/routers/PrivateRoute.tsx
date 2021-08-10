import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { Routes } from "../constants/routes";
import { useAuth } from "../contexts/AuthContext";

type PrivateRoutesProps = {
  component: React.ComponentType;
} & RouteProps;

export const PrivateRoutes = ({
  component: Component,
  ...rest
}: PrivateRoutesProps) => {
  const { currentUser } = useAuth();
  const render = (props: any) => {
    return currentUser ? (
      <Component {...props} />
    ) : (
      <Redirect to={Routes.HOME} />
    );
  };

  return <Route {...rest} render={render} />;
};
