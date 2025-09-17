import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import Saved from "./pages/Saved";
import Discover from "./pages/Discover";
import Register from "./pages/Forms/Register";
import Login from "./pages/Forms/Login";
import ErrorPage from "./pages/ErrorPage";
import { rootLoader } from "./loaders/rootLoader";
import UserNotConnected from "./components/ProtectedRoutes/UserNotConnected";
import UserConnected from "./components/ProtectedRoutes/UserConnected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/saved",
        element: <Saved />,
      },
      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/register",
        element: (
          <UserNotConnected>
            <Register />
          </UserNotConnected>
        ),
      },
      {
        path: "/login",
        element: (
          <UserNotConnected>
            <Login />
          </UserNotConnected>
        ),
      },
    ],
  },
]);
