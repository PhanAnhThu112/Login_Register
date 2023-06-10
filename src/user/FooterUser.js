import React from 'react';
import './FooterUser.css'; // Import stylesheet

function FooterUser() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h3>Về chúng tôi</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="footer-section">
          <h3>Liên hệ</h3>
          <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
          <p>Email: contact@example.com</p>
          <p>Điện thoại: 123-456-789</p>
        </div>
        <div className="footer-section">
          <h3>Liên kết</h3>
          <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Liên hệ</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default FooterUser;
