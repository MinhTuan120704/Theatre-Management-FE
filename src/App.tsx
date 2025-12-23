import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { CinemaProvider } from "./contexts";
import { Toaster } from "sonner";
import "./App.css";

function App() {
  return (
    <CinemaProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </CinemaProvider>
  );
}

export default App;
