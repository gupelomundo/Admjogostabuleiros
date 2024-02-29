import { createBrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  Login,
  SignIn,
  NotFound,
  Home,
  Profile,
  AdminDash,
  Orders,
} from "./pages";
import useUser from "./hooks/useUser";

function Root() {
  const { loggedUser } = useUser();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dash"
        element={loggedUser.name ? <AdminDash /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={loggedUser.name ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/orders"
        element={loggedUser.name ? <Orders /> : <Navigate to="/login" />}
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export const router = createBrowserRouter([{ path: "*", Component: Root }]);
