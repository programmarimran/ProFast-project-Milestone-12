import { createRoot } from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import { RouterProvider } from "react-router";
import router from "./routes/Router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className=" font-urbanist">
      <RouterProvider router={router}></RouterProvider>
    </div>
  </StrictMode>
);
