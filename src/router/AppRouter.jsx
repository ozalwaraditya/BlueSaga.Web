import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import CouponMangement from "../pages/admin/CouponMangement";
import ProductMangement from "../pages/admin/ProductMangement";
import InventoryManagment from "../pages/admin/InventoryManagment";
import Loader from "../components/ui/Loader";
import CategoryManagement from "../pages/admin/CategoryManagement";

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
        <Route path="/management/category" element={<CategoryManagement />} />
        <Route path="/management/coupons" element={<CouponMangement />} />
        <Route path="/management/products" element={<ProductMangement />} />
        <Route path="/management/inventory" element={<InventoryManagment />} />
        <Route path="/loader" element={<Loader />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
