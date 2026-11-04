import React from 'react';
import { Routes, Route } from 'react-router-dom'; 

// Layouts
import MainLayout from './components/MainLayout'; // Renamed from Layout
import DashboardLayout from './components/DashboardLayout'; 
import AuthLayout from './components/AuthLayout';
import BlankLayout from './components/BlankLayout'; // For checkout

// Customer Pages
import StoreFront from './storeFront';
import Categories from './products/categories';
import SingleCategory from './products/singleCategory';
import Details from './products/Details';
import Cart from './cart';
import Wishlist from './wishlist';
import Profile from './Profile';
import Orders from './orders';
import OrderDetails from './orders/Details';
// ... other customer imports

// Auth Pages
import SignIn from './auth/signin'; 
import SignUp from './auth/signup';
import StockistLogin from './auth/StockistLogin';
import CustomerReg from './auth/CustomerReg';

// Checkout Pages
import Checkout from './checkout';

// Dashboard Pages (Vendor / Affiliate / Stockist)
import Dashboard from './dashboard';
import AffilateDashboard from './affilate/dashboard';
import MyStore from './vendor/MyStore';
import Products from './vendor/Products';
import NewProduct from './vendor/NewProduct.js';
import Genealogy from './affilate/Genealogy';
// ... other dashboard imports

function App() {
  return (
    <Routes>
      
      {/* 1. AUTH ROUTES (No Header/Footer) */}
      <Route element={<AuthLayout />}>
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/stockist/sign-in" element={<StockistLogin />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/customer/sign-up" element={<CustomerReg />} />
      </Route>

      {/* 2. CHECKOUT ROUTES (Distraction-free) */}
      <Route element={<BlankLayout />}>
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      {/* 3. DASHBOARD ROUTES (Vendor / Affiliate / Stockist) */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/affilate/dashboard" element={<AffilateDashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/affiliate/genealogy" element={<Genealogy />} />
        {/* Add all vendor/affiliate/stockist routes here */}
      </Route>

      {/* 4. CUSTOMER STOREFRONT ROUTES (MainLayout) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<StoreFront />} />
        <Route path="/store/:storeId" element={<StoreFront />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/category/:categoryId" element={<SingleCategory />} />
        <Route path="/product/:id" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id/details" element={<OrderDetails />} />
        <Route path="/customer/profile" element={<Profile />} />
        {/* Add all customer-facing routes here */}
      </Route>

    </Routes>
  );
}

export default App;