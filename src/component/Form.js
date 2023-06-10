import React, { useState } from 'react';
import axios from 'axios';
import '../AddProduct.css';

const AddProductForm = () => {
  // State variables to store the form inputs
  const [name, setProductName] = useState('');
  const [price, setProductPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setProductBrand] = useState('');


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new product object with the form data
    const newProduct = {
      name,
      price,
      image,
      brand,
    };

    try {
      // Send the new product data to the server or API
      const response = await axios.post('http://127.0.0.1:8000/api/products', newProduct);

      // Check if the request was successful
      if (response.status === 201) {
        console.log('Product added successfully!');
        // Reset form inputs
        setProductName('');
        setProductPrice('');
        setImage('');
        setProductBrand('');
        // Redirect to the home page
        window.location.href = '/admin';
      } else {
        console.error('Failed to add product.');
      }
    } catch (error) {
      console.error('Error occurred while adding product:', error);
    }
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <div >
        <label htmlFor="productName">Tên Sản Phẩm</label>
        <input
          type="text"
          id="productName"
          value={name}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="productPrice">Giá Sản Phẩm</label>
        <input
          type="number"
          id="productPrice"
          value={price}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="image">Link Ảnh</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="productbrand">Thương hiệu</label>
        <input
          type="text"
          id="productCategory"
          value={brand}
          onChange={(e) => setProductBrand(e.target.value)}
        />
      </div>  
      <button type="submit">Thêm</button>
    </form>
    </div>
  );
};

export default AddProductForm;
