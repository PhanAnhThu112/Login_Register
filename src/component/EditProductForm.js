import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../AddProduct.css';

const EditProductForm = () => {
  const  {id}  = useParams();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: '',
    brand: '',
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
      
      setProduct(response.data);
      console.log(product);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/products/${id}`, product);
      // Gửi lại yêu cầu để lấy thông tin sản phẩm đã cập nhật
      const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
      setProduct(response.data);
      // Hoặc bạn có thể gọi hàm fetchProduct để lấy thông tin sản phẩm
      // fetchProduct();
      window.location.href = '/admin';
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h2 style={{marginLeft:350}}>Chỉnh Sửa Sản Phẩm</h2>
      <form onSubmit={handleSubmit} style={{marginLeft:350}}>
        <div>
          <label htmlFor="name">Tên Sản Phẩm:</label>
          <input type="text" id="name" name="name" value={product.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="price">Giá Sản Phẩm:</label>
          <input type="number" id="price" name="price" value={product.price} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="image">Link Ảnh:</label>
          <input type="text" id="image" name="image" value={product.image} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="color">Thương Hiệu</label>
          <input type="text" id="brand" name="brand" value={product.brand} onChange={handleChange} />
        </div>
        <button type="submit">Cập Nhật</button>
      </form>
    </div>
  );
};

export default EditProductForm;
