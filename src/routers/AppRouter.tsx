import { Redirect, Route, Switch } from "react-router-dom";
import { Routes } from "../constants/routes";
import { PrivateRoutes } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import loadable from "@loadable/component";
import NotFound from "../components/NotFound";

const AsyncLogin = loadable(() => import("../pages/Login"));
const AsyncNews = loadable(() => import("../pages/News"));
const AsyncHome = loadable(() => import("../pages/Home"));
const AsyncAbout = loadable(() => import("../pages/About"));
const AsyncPlayers = loadable(() => import("../pages/Players"));
const AsyncClubs = loadable(() => import("../pages/Clubs"));
const AsyncCreateNews = loadable(() => import("../pages/CreateNews"));
const AsyncPlayersSearcher = loadable(() => import("../pages/PlayersSearcher"));
const AsyncCalls = loadable(() => import("../pages/Calls"));
const AsyncCallsSearcher = loadable(() => import("../pages/CallSearcher"));
const AsyncClubsSearcher = loadable(() => import("../pages/clubsSearcher"));

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
      <PrivateRoutes path={Routes.CREATE_NEWS} component={AsyncCreateNews} />
      <PrivateRoutes
        path={Routes.PLAYERS_SEARCHER}
        component={AsyncPlayersSearcher}
      />
      <PrivateRoutes path={Routes.CALLS} component={AsyncCalls} />
      <PrivateRoutes
        path={Routes.CALLS_SEARCHER}
        component={AsyncCallsSearcher}
      />
      <PrivateRoutes
        path={Routes.CLUBS_SEARCHER}
        component={AsyncClubsSearcher}
      />
      <Route exact path="/">
        <Redirect to={Routes.NEWS} />
      </Route>
      <Route path="*" component={NotFound}></Route>
    </Switch>
  );
};
