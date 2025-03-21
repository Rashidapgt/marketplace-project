import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


const OrderHistoryPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:2500/api/orders/user/${user._id}`); // Example endpoint to fetch orders for the user
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    if (user) {
      fetchOrderHistory();
    }
  }, [user]);

  return (
    <div className={styles.orderHistoryContainer}>
      <h2>Order History</h2>
      
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className={styles.orderCard}>
              <h3>Order #{order._id}</h3>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ${order.totalAmount}</p>
              <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
              <button className={styles.trackOrderButton}>Track Order</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistoryPage;
