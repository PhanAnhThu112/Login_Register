import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import './PageUser.css'

function ProductList() {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/products')
        .then(response => response.json())
        .then(data => setProducts(data));
    }, []);
  
    const handleAddToCart = (product) => {
      addToCart(product);
    };
  
    return (
      <div className="row">
        <h1 style={{ textAlign: 'center' }}>Danh Sách Sản Phẩm Nổi Bật</h1>
        <br /> <br /> <br />
        {products.map(product => (
          <div className="col-md-3 mb-3" key={product.id}>
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Tên Sản phẩm: {product.name}</p>
                <p className="card-text">Thương hiệu: {product.brand}</p>
                <p className="card-text">Giá: {product.price}</p>
                <div className="card-buttons">
                  <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Add Cart</button>
                  <button className="btn btn-secondary">Detail</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default ProductList;
  
  
  
  
  
  