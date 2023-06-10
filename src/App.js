import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './user/CartContext';
import Header from './component/Header';
import Home from './component/Home';
import SlideNav from './component/SlideNav';
import Footer from './component/Footer';
import AddProductForm from './component/Form';
import HeaderUser from './user/HeaderUser';
import FooterUser from './user/FooterUser';
import ProductList from './user/PageUser';
import EditProductForm from './component/EditProductForm';
import Login from './user/Login';
import './App.css';
import Register from './user/register';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PageUser />} />
          <Route path="/admin/*" element={<PageAdmin />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

function PageUser() {
  return (
    <>
      <HeaderUser />
      <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes>
      <FooterUser/>
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
