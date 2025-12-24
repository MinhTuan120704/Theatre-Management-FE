// gồm danh sách router cho các route, phân quyền ra các file như public routes, protected routes, admin routes, manager routes,...

import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../screens/Home/Home";
import Auth from "../screens/Auth/Auth";
import Profile from "../screens/Profile/Profile";
import MovieDetailAndBooking from "../screens/MovieDetailAndBooking/MovieDetailAndBooking";
import Booking from "../screens/Booking/Booking";

// Public routes - accessible to all users
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetailAndBooking />,
      },
      {
        path: "booking/:showtimeId",
        element: <Booking />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;
