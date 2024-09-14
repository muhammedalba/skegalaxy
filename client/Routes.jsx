import {
  // Route,
  createBrowserRouter,
  // createRoutesFromElements,
} from "react-router-dom";

import App from "./src/App";

import SignUp from "./src/auth/signup/SignUp";
import Login from "./src/auth/login/Login";
import ForgotPassword from "./src/auth/forgotPassword/ForgotPassword";
import ResetPassword from "./src/auth/resetPassword/ResetPassword";
import Verifyresetcode from "./src/auth/Verifyresetcode/VerifyResetCode";

import Dashboard from "./src/dashboard/dashPage/Dashboard";

import CreateUser from "./src/dashboard/dashPage/users/CreateUser";
import Users from "./src/dashboard/dashPage/users/Users";
import User from "./src/dashboard/dashPage/users/User";

import Categories from "./src/dashboard/dashPage/categories/Categories";
import Category from "./src/dashboard/dashPage/categories/Category";
import Createcategory from "./src/dashboard/dashPage/categories/Createcategory";

import Product from "./src/dashboard/dashPage/products/Product";
import Products from "./src/dashboard/dashPage/products/Products";
import CreatProduct from "./src/dashboard/dashPage/products/CreatProduct";

import Brands from "./src/dashboard/dashPage/brands/Brands";
import CreateBrands from "./src/dashboard/dashPage/brands/CreateBrands";
import Brand from "./src/dashboard/dashPage/brands/Brand";

import Orders from "./src/dashboard/dashPage/orders/Orders";
import MinPage from "./src/dashboard/dashPage/MinPage";

import Coupons from "./src/dashboard/dashPage/coupons/Coupons";
import Coupon from "./src/dashboard/dashPage/coupons/Coupon";
import CreateCoupons from "./src/dashboard/dashPage/coupons/CreateCoupons";

import Carouseles from "./src/dashboard/dashPage/carousel/Carouseles";
import SingleCarousel from "./src/dashboard/dashPage/carousel/SingleCarousel";
import CreateCarousel from "./src/dashboard/dashPage/carousel/CreateCarousel";

import Order from "./src/dashboard/dashPage/orders/Order";

import ProtectedRoute from "./src/utils/ProtectedRoute";

import HomePage from "./src/pages/HomePage";
import AllCategories from "./src/pages/categories/AllCategories";
import ProductsCategory from "./src/pages/categories/ProductsCategory";

import InfoProduct from "./src/pages/products/InfoProduct";
import ProfileAccount from "./src/pages/ProfileAccount/ProfileAccount";
import ClientOrders from "./src/pages/userOrder/ClientOrders";
import UserOrder from "./src/pages/userOrder/UserOrder";

import Cart from "./src/pages/cart/Cart";
import Favorite from "./src/pages/Favorite/Favorite";
import About from "./src/pages/About/About";
import PrivacyPolic from "./src/pages/Policies/Privacy-polic";
import Error404 from "./src/components/Error404/Error404";
import AllBrands from "./src/pages/brands/AllBrands";
import ProductsBrands from "./src/pages/brands/ProductsBrands";

export const routes = createBrowserRouter([
  // HOME PAGE
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },

      { path: "brands", element: <AllBrands /> },
      { path: "brand/:BrandId", element: <ProductsBrands /> },

      { path: "categories", element: <AllCategories /> },
      { path: "category/:CategoryId", element: <ProductsCategory /> },

      { path: "verifyresetcode", element: <Verifyresetcode /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "forgotPassword", element: <ForgotPassword /> },

      { path: "cart", element: <Cart /> },
      { path: "Favorite", element: <Favorite /> },

      { path: "products/:productId", element: <InfoProduct /> },

      { path: "orders", element: <ClientOrders /> },
      { path: "orders/:orderId", element: <UserOrder /> },

      { path: "ProfileAccount", element: <ProfileAccount /> },
      { path: "About", element: <About /> },
      { path: "PrivacyPolic", element: <PrivacyPolic /> },
    ],
  },

  //  dashboard
  {
    path: "/dashboard",
    element: (
      // Path protection
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <MinPage /> },

      { path: "users", element: <Users /> },
      { path: "users/createUser", element: <CreateUser /> },
      { path: "users/:userId", element: <User /> },

      { path: "categories", element: <Categories /> },
      { path: "categories/:CategoryId", element: <Category /> },
      { path: "categories/createCategory", element: <Createcategory /> },

      { path: "products", element: <Products /> },
      { path: "products/createProduct", element: <CreatProduct /> },
      { path: "products/:productId", element: <Product /> },

      { path: "brands", element: <Brands /> },
      { path: "brands/createBrand", element: <CreateBrands /> },
      { path: "brands/:brandId", element: <Brand /> },

      { path: "orders", element: <Orders /> },
      { path: "orders/:orderId", element: <Order /> },

      { path: "coupons", element: <Coupons /> },
      { path: "coupons/createCoupon", element: <CreateCoupons /> },
      { path: "coupons/:couponId", element: <Coupon /> },

      { path: "carousel", element: <Carouseles /> },
      { path: "carousel/:carouselId", element: <SingleCarousel /> },
      { path: "carousel/createcarousel", element: <CreateCarousel /> },
    ],
  },
  { path: "*", element: <Error404 /> },
]);
