import { createRoot } from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import { RouterProvider } from "react-router";
import router from "./routes/Router";
import "aos/dist/aos.css";
import Aos from "aos";
import AuthProvider from "./contexts/auth/AuthProvider";
Aos.init();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className=" font-urbanist">
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </div>
  </StrictMode>
);
