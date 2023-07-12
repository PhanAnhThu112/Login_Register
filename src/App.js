  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import { CartProvider } from './user/CartContext';
  import Header from './component/Header';
  import Home from './component/Home';
  import { UserProvider } from './user/UserContext';
  import SlideNav from './component/SlideNav';
  import Footer from './component/Footer';
  import AddProductForm from './component/Form';
  import HeaderUser from './user/HeaderUser';
  import FooterUser from './user/FooterUser';
  import ProductList from './user/PageUser';
  import EditProductForm from './component/EditProductForm';
  import Login from './user/Login';
  import './App.css';
  import Payment from './user/Payment';
  import Register from './user/register';
  import Cart from './user/cart';
  import ForgotPassword from './user/ForgotPassword';
  import ResetPassword from './user/ResetPassword';
  import OtpVerification from './user/OtpVerification';
 

  function App() {
    return (
      <UserProvider> {/* Wrap the entire application with UserProvider */}
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<PageUser />} />
              <Route path="/admin/*" element={<PageAdmin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/verification" element={<OtpVerification />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
        </CartProvider>
      </UserProvider>
    );
  }

  function PageUser() {
    return (
      <>
        <HeaderUser />
        <Routes>
          <Route path="/" element={<ProductList />} />
        </Routes>
        <FooterUser />
      </>
    );
  }

  function PageAdmin() {
    return (
      <div className="admin-page">
        <Header />
        <SlideNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/edit-product/:id" element={<EditProductForm />} />
        </Routes>
        <Footer />
      </div>
    );
  }

  export default App;
