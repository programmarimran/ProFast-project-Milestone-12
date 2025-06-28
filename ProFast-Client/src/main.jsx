import { createRoot } from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import { RouterProvider } from "react-router";
import router from "./routes/Router";
import "aos/dist/aos.css";
import Aos from "aos";
import AuthProvider from "./contexts/auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
Aos.init();
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className=" font-urbanist">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </AuthProvider>
    </div>
  </StrictMode>
);
