import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import CarListing from "./components/CarListing";
import LoginPageClient from "./pages/Forms/LoginPageClient";
import LoginPageAgent from "./pages/Forms/LoginPageAgent";
import AdminAddUser from "./pages/Forms/AdminAddUser";
import Board from "./pages/Board";
import Agents from "./pages/Agents";
import Parking from "./pages/Parking";
import Locations from "./pages/Locations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout with NavBar & Footer
    children: [
      { index: true, element: <Home /> },
      { path: "cars", element: <CarListing /> },
    ],
  },
  { path: "/login", element: <LoginPageClient /> },
  { path: "/agent-login", element: <LoginPageAgent /> },
  { path: "/admin/add-user", element: <AdminAddUser /> },
  { path: "/admin", element: <Board /> },
  { path: "/admin/agents", element: <Agents /> },
  { path: "/admin/parking", element: <Parking /> },
  { path: "/admin/locations", element: <Locations /> },
  // Fallback for unknown routes
  { path: "*", element: <div className="p-8 text-center">Page not found</div> },
]);

export default router;