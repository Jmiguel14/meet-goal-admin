import { Redirect, Route, Switch } from "react-router-dom";
import { Routes } from "../constants/routes";
import { PrivateRoutes } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import loadable from "@loadable/component";

const AsyncLogin = loadable(() => import("../pages/Login"));
const AsyncNews = loadable(() => import("../pages/News"));
const AsyncHome = loadable(() => import("../pages/Home"));
const AsyncAbout = loadable(() => import("../pages/About"));
const AsyncPlayers = loadable(() => import("../pages/Players"));
const AsyncClubs = loadable(() => import("../pages/Clubs"));
const AsyncProfile = loadable(() => import("../pages/Profile"));
const AsyncCreateNews = loadable(() => import("../pages/CreateNews"));

export const AppRouter = () => {
  return (
    <Switch>
      <PublicRoute path={Routes.LOGIN} component={AsyncLogin} />
      <PublicRoute path={Routes.HOME} component={AsyncHome} />
      <PublicRoute path={Routes.SERVICES} component={AsyncHome} />
      <PublicRoute path={Routes.TEAM} component={AsyncHome} />
      <PublicRoute path={Routes.ABOUT} component={AsyncAbout} />
      <PrivateRoutes path={Routes.NEWS} component={AsyncNews} />
      <PrivateRoutes path={Routes.PLAYERS} component={AsyncPlayers} />
      <PrivateRoutes path={Routes.CLUBS} component={AsyncClubs} />
      <PrivateRoutes path={Routes.PROFILE} component={AsyncProfile} />
      <PrivateRoutes path={Routes.CREATE_NEWS} component={AsyncCreateNews} />
      <Route exact path="/">
        <Redirect to={Routes.NEWS} />
      </Route>
      <Route>No found</Route>
    </Switch>
  );
};
