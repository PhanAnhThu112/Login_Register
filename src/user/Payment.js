import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import axios from 'axios';
import './Payment.css';

function Payment() {
  const { cartItems } = useContext(CartContext);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = () => {
    const paymentData = {
      cartItems: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      total_price: totalPrice,
      name: name,
      address: address,
      phone_number: phoneNumber,
      payment_method: paymentMethod
    };

    axios.post('http://127.0.0.1:8000/api/payments', paymentData)
      .then(response => {
        console.log('Payment successful!');
        // Tiến hành xóa giỏ hàng hoặc làm các xử lý khác cần thiết
      })
      .catch(error => {
        console.error('Payment failed:', error);
      });
  };

  return (
    <div>
      <div>
        <h1>Payment</h1>
        <h3>Product Details</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <img src={item.image} height="50" alt={item.name} />
                </td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Total Price: {totalPrice}</h3>
      </div>

      <div>
        <h3>Payment Information</h3>
        <form>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
          </div>
          <div>
            <label>Phone Number:</label>
            <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          </div>
          <div>
            <label>Payment Method:</label>
            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
              <option value="">-- Select Payment Method --</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>
          <button type="button" onClick={handlePayment}>Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
