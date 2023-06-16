import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './HeaderUser.css'; // Import stylesheet
import { Link } from 'react-router-dom';
import UserContext from './UserContext'; // Import UserContext

function HeaderUser() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext); // Get loggedInUser and setLoggedInUser from UserContext

  const handleLogout = () => {
    // Handle logout here
    setLoggedInUser(null); // Clear logged-in user in the context
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Trang chủ</Link></li>
          <li><Link to="/products">Sản phẩm</Link></li>
          <li><Link to="/contact">Thông tin liên lạc</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} /></Link></li>
          {loggedInUser ? (
            <>
              <li>Xin chào, {loggedInUser}</li>
              <li><button onClick={handleLogout}>Đăng xuất</button></li>
            </>
          ) : (
            <>
              <li><Link to="/register">Đăng kí</Link></li>
              <li><Link to="/login">Đăng nhập</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default HeaderUser;
