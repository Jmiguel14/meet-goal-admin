const PublicRoutes = {
    LOGIN: '/iniciar-sesion',
    HOME: '/home',
    ABOUT: '/nosotros'
}

const PrivateRoutes = {
    NEWS: '/noticias',
    PLAYERS: '/jugadores',
    CLUBS: '/clubes',
    PROFILE: '/perfil'
}

export const Routes = {
    ...PublicRoutes,
    ...PrivateRoutes
}