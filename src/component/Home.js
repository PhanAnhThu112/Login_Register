// Home.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    // Hiển thị cảnh báo xác nhận xóa
    const confirmDelete = window.confirm("Bạn có muốn xóa sản phẩm này?");
  
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/products/${productId}`);
  
        // Xóa sản phẩm khỏi danh sách
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div>
      <div className="content-wrapper">
        <Link to="/admin/add-product">Thêm Sản Phẩm</Link>
        <div className="table-responsive">
          <table className="table table-striped table-full-width">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên Sản Phẩm</th>
                <th>giá</th>
                <th>Hình Ảnh</th>
                <th>brand</th>
                <th>logo</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <img src={product.image} alt={product.productName} height="50" />
                  </td>
                  <td>{product.brand}</td>
                  <td>
                  <img src={product.logo} alt={product.productName} height="50" />
                  </td>
                  <td className="button-row">
                    <button className="btn btn-warning">
                    <Link to={`edit-product/${product.id}`}>Sửa</Link></button>
                    <button className="btn btn-success">Xem</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
