const PublicRoutes = {
  LOGIN: "/iniciar-sesion",
  HOME: "/inicio",
  ABOUT: "/nosotros",
};

const PrivateRoutes = {
  NEWS: "/noticias",
  PLAYERS: "/jugadores",
  CLUBS: "/clubes",
  PROFILE: "/perfil",
  CREATE_NEWS: "/crear-noticia"
};

export const Routes = {
  ...PublicRoutes,
  ...PrivateRoutes,
};
