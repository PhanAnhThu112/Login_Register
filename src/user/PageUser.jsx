import React, { useContext, useEffect, useState, useRef } from 'react';
import { CartContext } from './CartContext';
import './PageUser.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ProductList() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cart-items')
      .then(response => response.json())
      .then(data => setCartItems(data));
  }, []);

  const handleAddToCart = (product) => {
    fetch('http://127.0.0.1:8000/api/cart-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: product.id,
        quantity: 1
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCartItems([...cartItems, data]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '100px',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false
        }
      }
    ]
  };

  return (
    <div>
      <h1 className="title" style={{ marginLeft: 400 }}>
        Danh Sách Sản Phẩm Nổi Bật
      </h1>
      <br /> <br /> <br />
      <Slider {...settings} ref={sliderRef}>
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
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                    disabled={cartItems.some(item => item.product_id === product.id)}
                  >
                    {cartItems.some(item => item.product_id === product.id) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                  <button className="btn btn-secondary">Detail</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductList;
