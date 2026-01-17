import { Outlet, Route, Routes } from "react-router-dom";
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
import ProtectedRoutes from "./ProtectedRoutes";
import Products from "../pages/products/Products";
import ShoppingCart from "../pages/cart/ShoppingCart";
import Orders from "../pages/orders/Orders";
import MyOrders from "../pages/profile/MyOrder";
import OrderDetails from "../pages/profile/OrderDetails";

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
        {/* Admin */}
        <Route
          path="/management/*"
          element={
            <ProtectedRoutes allowedRoles={["Admin"]}>
              <Outlet />
            </ProtectedRoutes>
          }
        >
          <Route path="category" element={<CategoryManagement />} />
          <Route path="category-form" element={<CategoryForm />} />
          <Route path="category-form/:id" element={<CategoryForm />} />
          <Route path="coupons" element={<CouponMangement />} />
          <Route path="coupons-form" element={<CouponForm />} />
          <Route path="coupons-form/:id" element={<CouponForm />} />
          <Route path="products" element={<ProductMangement />} />
          <Route path="products-form" element={<ProductForm />} />
          <Route path="products-form/:id" element={<ProductForm />} />
          <Route path="inventory" element={<InventoryManagment />} />
        </Route>
        {/* User */}
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="my-orders/details/:id" element={<OrderDetails />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
