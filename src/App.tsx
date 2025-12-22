import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { CinemaProvider } from "./contexts";
import "./App.css";

function App() {
  return (
    <CinemaProvider>
      <RouterProvider router={router} />
    </CinemaProvider>
  );
}

export default App;
