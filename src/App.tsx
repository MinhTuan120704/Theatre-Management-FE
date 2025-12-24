import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { CinemaProvider, AuthProvider } from "./contexts";
import { Toaster } from "sonner";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CinemaProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors />
      </CinemaProvider>
    </AuthProvider>
  );
}

export default App;
