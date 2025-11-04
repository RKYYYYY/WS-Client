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
import ProfileSettings from "./pages/Profile/ProfileSettings";
import Profile from "./pages/Profile/Profile";
import UserProfile from "./pages/Profile/UserProfile";

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
        element: (
          <UserConnected>
            <Saved />,
          </UserConnected>
        ),
      },
      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/profile",
        element: (
          <UserConnected>
            <Profile />
          </UserConnected>
        ),
      },
      { path: "/profile/:userId", element: <UserProfile /> },
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
      {
        path: "/profile-settings",
        element: (
          <UserConnected>
            <ProfileSettings />
          </UserConnected>
        ),
      },
    ],
  },
]);
