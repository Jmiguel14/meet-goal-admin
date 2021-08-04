import React from "react";
import { Route, RouteProps } from "react-router-dom";

type PublicRoutesProps = {
  component: React.ComponentType;
} & RouteProps;

export const PublicRoute = ({
  component: Component,
  ...rest
}: PublicRoutesProps) => {
  const render = (props: any) => {
    return <Component {...props} />;
  };

  return <Route {...rest} render={render} />;
};
