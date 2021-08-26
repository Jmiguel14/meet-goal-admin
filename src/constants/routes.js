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
  PROFILE: "/perfil",
  CREATE_NEWS: "/crear-noticia",
  PLAYERS_SEARCHER: "/buscar-jugadores",
<<<<<<< HEAD
  CALLS: "/convocatorias/:id",
  CALLS_SEARCHER: "/buscar-convocatorias",
=======
  CLUBS_SEARCHER: "/buscar-clubes",
>>>>>>> 3aa54bb8987ccfe8172cbb5df516a8eceb3fc76c
};

export const Routes = {
  ...PublicRoutes,
  ...PrivateRoutes,
};
