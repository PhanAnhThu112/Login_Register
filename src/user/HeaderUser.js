import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './HeaderUser.css'; // Import stylesheet
import { Link } from 'react-router-dom';

function HeaderUser() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Trang chủ</Link></li>
          <li><Link to="/products">Sản phẩm</Link></li>
          <li><Link to="/contact">Thông tin liên lạc</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} /></Link></li>
          <li><Link to="/register">Đăng kí</Link></li>
          <li><Link to="/login">Đăng nhập</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderUser;
