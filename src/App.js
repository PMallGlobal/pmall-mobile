import logo from './logo.svg';
import './App.css';
import SignIn from './auth/signin'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './auth/signup';
import StoreFront from './storeFront';
import Layout from './components/Layout';
import Categories from './products/categories';
import SingleCategory from './products/singleCategory';
import Details from './products/Details';
import Cart from './cart';
import Wishlist from './wishlist';
import Checkout from './checkout';
import Orders from './orders';
import OrderDetails from './orders/Details';
import Profile from './Profile';
import Rating from './rating';
import Address from './address';
import ChangePassword from './auth/ChangePassword';
import SupportCenter from './SupportCenter';
import Products from './vendor/Products';
import NewProduct from './vendor/NewProduct.js';
import EditProduct from './vendor/EditProduct';
import VendorProfile from './vendor/VendorProfile';
import VendorOrders from './vendor/Orders';
import FundWithdrawal from './withdrawal';
import Withdraw from './withdrawal/Withdraw';
import Transfer from './withdrawal/Transfer';
import TransactionSummary from './withdrawal/TransactionSummary';
import Menu from './menu';
import TransferPinPage from './withdrawal/TransferPin';
import ProductStatistics from './vendor/ProductStatistics';
import MyStore from './vendor/MyStore';
import AffilateDashboard from './affilate/dashboard';
import EditProfile from './affilate/EditProfile';
import AddVendor from './affilate/AddVendor';
import AddAffilate from './affilate/AddAffilate';
import MyVendors from './affilate/MyVendors';
import MyAffilates from './affilate/MyAffilates';
import MyVendorDetails from './affilate/MyVendorDetails';
import Genealogy from './affilate/Genealogy';
import GenealogyProfile from './affilate/GenealogyProfile';
import GenealogyTree from './affilate/GenealogyTree';
import StockistDashboard from './Stockist/dashboard';
import AvailableStock from './Stockist/AvailableStock';
import SearchUser from './Stockist/SearchUser';
import TransactionRecords from './Stockist/TransactionRecords';
import Notifications from './Stockist/Notifications';
import Support from './Stockist/Support';
import Wallet from './Stockist/Wallet';
import Logistics from './Stockist/Logistics';
import Settings from './Stockist/Settings';
import Analytics from './Stockist/Analytics';
import StockistMenu from './Stockist/menu';
import OrderManagement from './Stockist/OrderManagement';
import AllOrders from './Stockist/AllOrders';
import AssignToDispatch from './Stockist/AssignToDispatch';
import Refund from './Stockist/Refund';
import Statistics from './Stockist/Statistiics';
import InventoryManagement from './Stockist/InventoryManagement';
import AddStockist from './affilate/AddStockist';
import MyStockist from './affilate/MyStockist';
import AllStockists from './AllStockists';
import StockistLogin from './auth/StockistLogin';
import EditStockist from './affilate/EditStockist';
import Dashboard from './dashboard';
import CustomerReg from './auth/CustomerReg';
import IRecharge from './components/iRecharge';
import AffiliateManagement from './AfffiliateManagement';


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/stockist/sign-in" element={<StockistLogin />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/customer/sign-up" element={<CustomerReg />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<StoreFront />} />
          <Route path="/store/:storeId" element={<StoreFront />} />
        </Route>
        <Route path="/category" element={<Categories />} />
        <Route path="/category/:categoryId" element={<SingleCategory />} />
        <Route path="/product/:id" element={<Details/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id/details" element={<OrderDetails />} />
        <Route path="/customer/profile" element={<Profile />} />
        <Route path="/ratings-and-reviews" element={<Rating />} />
        <Route path="/address" element={<Address />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/support" element={<SupportCenter />} />
        <Route path="/products" element={<Products />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/profile" element={<VendorProfile />} />
        <Route path="/vendor/orders" element={<VendorOrders />} />
        <Route path="/withdraw-funds" element={<FundWithdrawal />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/transaction-summary" element={<TransactionSummary />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pin" element={<TransferPinPage />} />
        <Route path="/product/:id/statistics" element={<ProductStatistics />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendor/:myStore" element={<MyStore />} />
        <Route path="/affilate/dashboard" element={<AffilateDashboard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/add-vendor" element={<AddVendor />} />
        <Route path="/affiliate-management" element={<AffiliateManagement/>} />
        <Route path="/affiliate/add-affiliate" element={<AddAffilate/>} />
        <Route path="/affiliate/my-vendors" element={<MyVendors/>} />
        <Route path="/affiliate/add-stockist" element={<AddStockist/>} />
        <Route path="/affiliate/edit-stockist/:id" element={<EditStockist/>} />
        <Route path="/affiliate/my-stockists" element={<MyStockist/>} />
        <Route path="/all-stockists" element={<AllStockists/>} />
        <Route path="/affiliate/my-affiliates" element={<MyAffilates/>} />
        <Route path="/affiliate/my-vendors/details" element={<MyVendorDetails />} />
        <Route path="/affiliate/genealogy" element={<Genealogy />} />
        <Route path="/affiliate/genealogy/profile" element={<GenealogyProfile />} />
        <Route path="/affiliate/genealogy/tree" element={<GenealogyTree/>} />
        <Route path="/stockist/dashboard" element={<StockistDashboard />} />
        <Route path="/stockist/available-stock" element={<AvailableStock />} />
        <Route path="/search-user" element={<SearchUser />} />
        <Route path="/transaction-records" element={<TransactionRecords />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/stockist/support" element={<Support />} />
        <Route path="/stockist/wallet" element={<Wallet />} />
        <Route path="/stockist/logistics" element={<Logistics />} />
        <Route path="/stockist/settings" element={<Settings />} />
        <Route path="/stockist/statistics" element={<Statistics />} />
        <Route path="/stockist/menu" element={<StockistMenu />} />
        <Route path="/stockist/order-management" element={<OrderManagement />} />
        <Route path="/stockist/orders" element={<AllOrders />} />
        <Route path="/order/assign-to-dispatch" element={<AssignToDispatch />} />
        <Route path="/stockist/refund" element={<Refund />} />
        <Route path="/stockist/analytics" element={<Analytics />} />
        <Route path="/stockist/inventory-management" element={<InventoryManagement />} />
        <Route path="/iRecharge" element={<IRecharge />} />

      </Routes>
    </Router>
  );
}

export default App;