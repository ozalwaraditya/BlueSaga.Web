import { Route, Routes } from "react-router-dom";
import Loader from "../components/ui/Loader";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/Home/Home"));
const Register = lazy(() => import("../pages/auth/Register"));
const Login = lazy(() => import("../pages/auth/Login"));

function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loader" element={<Loader />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
