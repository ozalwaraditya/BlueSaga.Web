import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import CouponMangement from "../pages/admin/CouponMangement";
import ProductMangement from "../pages/admin/ProductMangement";
import InventoryManagment from "../pages/admin/InventoryManagment";
import Loader from "../components/ui/Loader";
import CategoryManagement from "../pages/admin/CategoryManagement";
import PageNotFound from "../components/ui/PageNotFound";
import CategoryForm from "../pages/admin/category/CategoryForm";
import CouponForm from "../pages/admin/coupon/CouponForm";
import ProductForm from "../pages/admin/product/ProductForm";

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
        <Route path="/management/category-form" element={<CategoryForm />} />
        <Route path="/management/category-form/:id" element={<CategoryForm />} />
        <Route path="/management/coupons" element={<CouponMangement />} />
        <Route path="/management/coupons-form" element={<CouponForm />} />
        <Route path="/management/coupons-form/:id" element={<CouponForm />} />
        <Route path="/management/products" element={<ProductMangement />} />
        <Route path="/management/products-form" element={<ProductForm />} />
        <Route path="/management/products-form/:id" element={<ProductForm />} />
        <Route path="/management/inventory" element={<InventoryManagment />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
