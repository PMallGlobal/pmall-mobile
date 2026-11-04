import React from 'react';
import { Routes, Route } from 'react-router-dom'; 

// --- LAYOUTS ---
import Mai
import MainLayout from '../components/MainLayout'; // New
import DashboardLayout from '../components/DashboardLayout'; // New
import AuthLayout from '../components/AuthLayout'; // New
import CheckoutLayout from '../components/CheckoutLayout'; // New

// --- AUTH PAGES ---
import SignIn from './auth/signin'; 
import SignUp from './auth/signup';
import StockistLogin from './auth/StockistLogin';
import CustomerReg from './auth/CustomerReg';

// --- MALL / CUSTOMER PAGES ---
import StoreFront from './storeFront';
import Categories from './products/categories';
import SingleCategory from './products/singleCategory';
import Details from './products/Details';
import Cart from './cart';
import Wishlist from './wishlist';
import Orders from './orders';
import OrderDetails from './orders/Details';
import Profile from './Profile';

// --- DASHBOARD PAGES (Vendor / Affiliate / Stockist) ---
import Dashboard from './dashboard';
import AffilateDashboard from './affilate/dashboard';
import Products from './vendor/Products';
import NewProduct from './vendor/NewProduct.js';
import EditProduct from './vendor/EditProduct';
import VendorProfile from './vendor/VendorProfile';
import FundWithdrawal from './withdrawal';
import Withdraw from './withdrawal/Withdraw';
import Transfer from './withdrawal/Transfer';
import MyStore from './vendor/MyStore';
import EditProfile from './affilate/EditProfile';
import AddVendor from './affilate/AddVendor';
import AddAffilate from './affilate/AddAffilate';
import MyVendors from './affilate/MyVendors';
import MyAffilates from './affilate/MyAffilates';
import Genealogy from './affilate/Genealogy';
import GenealogyTree from './affilate/GenealogyTree';
import AddStockist from './affilate/AddStockist';
import MyStockist from './affilate/MyStockist';
import AffiliateManagement from './AfffiliateManagement';
// ... (import your other dashboard pages here)

// --- CHECKOUT PAGE ---
import Checkout from './checkout';

function App() {
  return (
    <Routes>
      
      {/* 1. AUTH ROUTES (No Header, No Footer) */}
      <Route element={<AuthLayout />}>
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/stockist/sign-in" element={<StockistLogin />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/customer/sign-up" element={<CustomerReg />} />
      </Route>

      {/* 2. CHECKOUT ROUTES (Distraction-free) */}
      <Route element={<CheckoutLayout />}>
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      {/* 3. DASHBOARD ROUTES (Vendor/Affiliate/Stockist) */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/affilate/dashboard" element={<AffilateDashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/profile" element={<VendorProfile />} />
        <Route path="/withdraw-funds" element={<FundWithdrawal />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/vendor/:myStore" element={<MyStore />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/add-vendor" element={<AddVendor />} />
        <Route path="/affiliate-management" element={<AffiliateManagement/>} />
        <Route path="/affiliate/add-affiliate" element={<AddAffilate/>} />
        <Route path="/affiliate/my-vendors" element={<MyVendors/>} />
        <Route path="/affiliate/add-stockist" element={<AddStockist/>} />
        <Route path="/affiliate/my-stockists" element={<MyStockist/>} />
        <Route path="/affiliate/my-affiliates" element={<MyAffilates/>} />
        <Route path="/affiliate/genealogy" element={<Genealogy />} />
        <Route path="/affiliate/genealogy/tree" element={<GenealogyTree/>} />
        {/* Add all other vendor/stockist/affiliate routes here */}
      </Route>

      {/* 4. CUSTOMER / MALL ROUTES (Has Header & Bottom Nav) */}
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
      </Route>

    </Routes>
  );
}

export default App;