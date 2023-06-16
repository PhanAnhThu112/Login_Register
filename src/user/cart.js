import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import './cart.css';

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cart-items')
      .then(response => response.json())
      .then(data => {
        setCartProducts(data);
        updateTotalPrice(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const updateTotalPrice = (cartProducts) => {
    const total = cartProducts.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
    setTotalPrice(total);
  };

  const handleRemoveFromCart = (cartItemId) => {
    fetch(`http://127.0.0.1:8000/api/cart-items/${cartItemId}`, {
      method: 'DELETE'
    })
      .then(() => {
        removeFromCart(cartItemId);
        const updatedCartProducts = cartProducts.filter(item => item.id !== cartItemId);
        setCartProducts(updatedCartProducts);
        updateTotalPrice(updatedCartProducts);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleIncreaseQuantity = (cartItemId) => {
    const updatedCartProducts = cartProducts.map(item => {
      if (item.id === cartItemId) {
        const updatedQuantity = item.quantity + 1;
        const updatedPrice = item.product.price * updatedQuantity;
        updateQuantityInApi(cartItemId, updatedQuantity, updatedPrice);
        return { ...item, quantity: updatedQuantity, product: { ...item.product, price: item.product.price } };
      }
      return item;
    });
    setCartProducts(updatedCartProducts);
    updateTotalPrice(updatedCartProducts);
  };

  const handleDecreaseQuantity = (cartItemId) => {
    const updatedCartProducts = cartProducts.map(item => {
      if (item.id === cartItemId && item.quantity > 1) {
        const updatedQuantity = item.quantity - 1;
        const updatedPrice = item.product.price * updatedQuantity;
        updateQuantityInApi(cartItemId, updatedQuantity, updatedPrice);
        return { ...item, quantity: updatedQuantity, product: { ...item.product, price: item.product.price } };
      }
      return item;
    });
    setCartProducts(updatedCartProducts);
    updateTotalPrice(updatedCartProducts);
  };

  const updateQuantityInApi = (cartItemId, newQuantity, newPrice) => {
    fetch(`http://127.0.0.1:8000/api/cart-items/${cartItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: newQuantity, price: newPrice }),
    })
      .catch(error => {
        console.error(error);
      });
  };

  const handleProceedToPayment = () => {
    // Add logic to handle proceeding to payment
  };

  const handleViewDetails = (productId) => {
    // Add logic to handle viewing details
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map(item => (
              <tr key={item.id}>
                <td>{item.product.id}</td>
                <td>{item.product.name}</td>
                <td>
                  <img src={item.product.image} height="50" alt={item.product.name} />
                </td>
                <td>{item.product.brand}</td>
                <td>{item.product.price}</td>
                <td>
                  <div className="quantity-control">
                    <button className="quantity-btn" onClick={() => handleDecreaseQuantity(item.id)}>
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button className="quantity-btn" onClick={() => handleIncreaseQuantity(item.id)}>
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item.id)}>
                    Remove
                  </button>
                  <button className="btn btn-primary mx-2" onClick={() => handleViewDetails(item.product.id)}>
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ marginLeft: 700 }}>Total Price: {totalPrice}</div>
      <br /><br /><br />
      <div className="mt-3" style={{ marginLeft: 200 }}>
        <button className="btn btn-success" onClick={handleProceedToPayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Cart;
