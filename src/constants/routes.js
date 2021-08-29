const PublicRoutes = {
  LOGIN: "/iniciar-sesion",
  HOME: "/inicio",
  TEAM: "/equipo",
  SERVICES: "/servicios",
  ABOUT: "/nosotros",
};

const PrivateRoutes = {
  NEWS: "/noticias",
  PLAYERS: "/jugadores/:id",
  CLUBS: "/clubes/:id",
  CREATE_NEWS: "/crear-noticia",
  PLAYERS_SEARCHER: "/buscar-jugadores",
  CALLS: "/convocatorias/:id",
  CALLS_SEARCHER: "/buscar-convocatorias",
  CLUBS_SEARCHER: "/buscar-clubes",
};

export const Routes = {
  ...PublicRoutes,
  ...PrivateRoutes,
};
