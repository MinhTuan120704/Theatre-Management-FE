// API Endpoints Configuration

export const ENDPOINTS = {
  // Cinema endpoints
  CINEMAS: {
    GET_ALL: "/cinemas",
    GET_BY_ID: (id: number) => `/cinemas/${id}`,
    CREATE: "/cinemas",
    UPDATE: (id: number) => `/cinemas/${id}`,
    DELETE: (id: number) => `/cinemas/${id}`,
  },

  // Movie endpoints
  MOVIES: {
    GET_ALL: "/movies",
    GET_BY_ID: (id: number) => `/movies/${id}`,
    GET_BY_CINEMA_ID: (cinemaId: number) => `/movies/cinema/${cinemaId}`,
    CREATE: "/movies",
    UPDATE: (id: number) => `/movies/${id}`,
    DELETE: (id: number) => `/movies/${id}`,
  },

  // Order endpoints
  ORDERS: {
    GET_ALL: "/orders",
    GET_BY_ID: (id: number) => `/orders/${id}`,
    GET_BY_USER_ID: (userId: number) => `/orders/user/${userId}`,
    CANCEL: (id: number) => `/orders/${id}/cancel`,
    CREATE: "/orders",
    UPDATE: (id: number) => `/orders/${id}`,
    DELETE: (id: number) => `/orders/${id}`,
  },

  // Product endpoints
  PRODUCTS: {
    GET_ALL: "/products",
    GET_BY_ID: (id: number) => `/products/${id}`,
    CREATE: "/products",
    UPDATE: (id: number) => `/products/${id}`,
    DELETE: (id: number) => `/products/${id}`,
  },

  // Review endpoints
  REVIEWS: {
    GET_ALL: "/reviews",
    GET_BY_ID: (id: number) => `/reviews/${id}`,
    CREATE: "/reviews",
    UPDATE: (id: number) => `/reviews/${id}`,
    DELETE: (id: number) => `/reviews/${id}`,
  },

  // User endpoints
  USERS: {
    GET_ALL: "/users",
    GET_BY_ID: (id: number) => `/users/${id}`,
    GET_BY_EMAIL: (email: string) => `/users/email/${email}`,
    CREATE: "/users",
    UPDATE: (id: number) => `/users/${id}`,
    DELETE: (id: number) => `/users/${id}`,
  },

  // Room endpoints
  ROOMS: {
    GET_ALL: "/rooms",
    GET_BY_ID: (id: number) => `/rooms/${id}`,
    CREATE: "/rooms",
    UPDATE: (id: number) => `/rooms/${id}`,
    DELETE: (id: number) => `/rooms/${id}`,
  },

  // Seat endpoints
  SEATS: {
    GET_ALL: "/seats",
    GET_BY_ID: (id: number) => `/seats/${id}`,
    CREATE: "/seats",
    UPDATE: (id: number) => `/seats/${id}`,
    DELETE: (id: number) => `/seats/${id}`,
  },

  // Showtime endpoints
  SHOWTIMES: {
    GET_ALL: "/showtimes",
    GET_BY_ID: (id: number) => `/showtimes/${id}`,
    SEARCH_BY_MOVIE_ID: (movieId: number) =>
      `/showtimes/searchByMovieId/${movieId}`,
    GET_BY_CINEMA_MOVIE_DATE: (
      cinemaId: number,
      movieId: number,
      date: string
    ) => `/showtimes/cinema/${cinemaId}/movie/${movieId}/date/${date}`,
    CREATE: "/showtimes",
    UPDATE: (id: number) => `/showtimes/${id}`,
    DELETE: (id: number) => `/showtimes/${id}`,
  },

  // Ticket endpoints
  TICKETS: {
    GET_ALL: "/tickets",
    GET_BY_ID: (id: number) => `/tickets/${id}`,
    CREATE: "/tickets",
    UPDATE: (id: number) => `/tickets/${id}`,
    DELETE: (id: number) => `/tickets/${id}`,
  },

  // Discount endpoints
  DISCOUNTS: {
    GET_ALL: "/discounts",
    GET_BY_ID: (id: number) => `/discounts/${id}`,
    CREATE: "/discounts",
    UPDATE: (id: number) => `/discounts/${id}`,
    DELETE: (id: number) => `/discounts/${id}`,
  },

  // Employee endpoints
  EMPLOYEES: {
    GET_ALL: "/employees",
    GET_BY_ID: (id: number) => `/employees/${id}`,
    CREATE: "/employees",
    UPDATE: (id: number) => `/employees/${id}`,
    DELETE: (id: number) => `/employees/${id}`,
  },

  // Auth endpoints
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    LOGOUT_ALL: "/auth/logout-all",
    REFRESH_TOKEN: "/auth/refresh-token",
    REQUEST_PASSWORD_RESET: "/auth/request-password-reset",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/auth/change-password",
    VERIFY_TOKEN: "/auth/verify-token",
  },
} as const;

export default ENDPOINTS;
