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

// import SubCategory from "./src/dashboard/dashPage/subcategory/SubCategory";
// import SubCategories from "./src/dashboard/dashPage/subcategory/SubCategories";
// import CreateSubCategory from "./src/dashboard/dashPage/subcategory/CreateSubCategory";

import Brands from "./src/dashboard/dashPage/brands/Brands";
import CreateBrands from "./src/dashboard/dashPage/brands/CreateBrands";
import Brand from "./src/dashboard/dashPage/brands/Brand";
// import Transfers from "./src/dashboard/dashPage/transfers/transfers";
// import Transfer from "./src/dashboard/dashPage/transfers/Transfer";
import ProtectedRoute from "./src/utils/ProtectedRoute";

// import ProductsCategory from "./src/pages/ProductsCategory";
// import Cart from "./src/pages/cart/Cart";
import ProfileAccount from "./src/pages/ProfileAccount/ProfileAccount";
// import UserTransfer from "./src/pages/userTransfer/UserTransfer";

// import AddTransfer from "./src/pages/userTransfer/AddTransfer";
// import TransFer from "./src/pages/userTransfer/TransFer";

import UserOrder from "./src/pages/userOrder/UserOrder";

import Orders from "./src/dashboard/dashPage/orders/Orders";
import MinPage from "./src/dashboard/dashPage/MinPage";
import HomePage from "./src/pages/HomePage";

import Coupons from "./src/dashboard/dashPage/coupons/Coupons";
import Coupon from "./src/dashboard/dashPage/coupons/Coupon";
import CreateCoupons from "./src/dashboard/dashPage/coupons/CreateCoupons";
import Cart from "./src/pages/cart/Cart";
import InfoProduct from "./src/pages/products/InfoProduct";

import Order from "./src/dashboard/dashPage/orders/Order";
import ClientOrders from "./src/pages/userOrder/ClientOrders";
import Carouseles from "./src/dashboard/dashPage/carousel/Carouseles";
import SingleCarousel from "./src/dashboard/dashPage/carousel/SingleCarousel";
import CreateCarousel from "./src/dashboard/dashPage/carousel/CreateCarousel";
import Error404 from "./src/components/Error404/Error404";




export const routes = createBrowserRouter([
  // HOME PAGE
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      // { path: "category/:CategoryId", element: <ProductsCategory /> },

      { path: "verifyresetcode", element: <Verifyresetcode /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "forgotPassword", element: <ForgotPassword /> },
      
      { path: "cart", element: < Cart/> },

      { path: "products/:productId", element: < InfoProduct/> },
      
      { path: "orders", element: < ClientOrders/> },
      { path: "orders/:orderId", element: <UserOrder /> },

      { path: "ProfileAccount", element: <ProfileAccount /> },

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
      { path: "coupons/createCoupon", element : <CreateCoupons/> },
      { path: "coupons/:couponId", element: <Coupon /> },
  
      { path: "carousel", element: <Carouseles /> },
      { path: "carousel/:carouselId", element: <SingleCarousel /> },
      { path: "carousel/createcarousel", element: <CreateCarousel /> },

    ],
  },
  {path:'*', element:<Error404 />},
]);
