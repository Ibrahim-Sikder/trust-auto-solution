import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from "./Routes/Route.jsx";
import { QueryClient, QueryClientProvider, } from "react-query";
import AuthProvider from "./contexts/AuthProvider.jsx";
import PrintProvider from "./pages/context/PrintProvider.jsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrintProvider>
        <AuthProvider>
        <ToastContainer />
          <RouterProvider router={router} />
        </AuthProvider>
      </PrintProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
