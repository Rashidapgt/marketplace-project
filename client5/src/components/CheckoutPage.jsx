import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Updated to useNavigate
import axios from "axios";
import { applyCoupon } from "../store/CartSlice"; // Redux action for coupon

const CheckoutPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { discount } = useSelector((state) => state.cart); // Get discount from Redux
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Using useNavigate for navigation

  useEffect(() => {
    // Fetch the user's cart items from backend or localStorage
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("/api/cart"); // Example endpoint to fetch cart
        console.log("Cart items from API:", response.data); // Log the response data
        if (Array.isArray(response.data)) {
          setCart(response.data);
          calculateTotal(response.data);
        } else {
          console.error("Cart data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (cartItems) => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    setTotal(totalAmount);
  };

  // Apply Coupon Code
  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post("/api/coupons/apply", { coupon });
      dispatch(applyCoupon(response.data.discount)); // Store discount in Redux
      setError("");
    } catch (err) {
      setError("Invalid coupon code");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: user._id,
        items: cart,
        shippingAddress,
        paymentMethod,
        totalAmount: total - discount, // Apply discount
        discountApplied: discount, // Include discount info
      };

      // Place the order
      const response = await axios.post("/api/orders", orderData); // Example endpoint to place an order

      if (response.data.success) {
        // Trigger email notification
        await axios.post("/api/send-email", {
          userEmail: user.email,
          orderId: response.data.orderId,
          items: cart,
        });

        navigate("/order-history"); // Use navigate instead of history.push
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  // Inline styles object
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "'Arial', sans-serif",
    },
    header: {
      fontSize: "2rem",
      marginBottom: "20px",
    },
    input: {
      padding: "10px",
      margin: "10px 0",
      width: "100%",
      borderRadius: "5px",
      border: "1px solid #ddd",
    },
    select: {
      padding: "10px",
      margin: "10px 0",
      width: "100%",
      borderRadius: "5px",
      border: "1px solid #ddd",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    error: {
      color: "red",
      marginTop: "10px",
    },
    orderSummary: {
      marginTop: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      backgroundColor: "#f9f9f9",
    },
    orderItem: {
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Checkout</h2>
      
      {/* Shipping Address */}
      <div className="shipping-details">
        <h5>Shipping Address</h5>
        <input
          type="text"
          placeholder="Enter your shipping address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          style={styles.input}
          required
        />
      </div>

      {/* Payment Method */}
      <div className="payment-method">
        <h5>Payment Method</h5>
        <select onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod} style={styles.select}>
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      {/* Coupon Section */}
      <div className="coupon-section">
        <h5>Apply Coupon</h5>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleApplyCoupon} style={styles.button}>Apply Coupon</button>
        {error && <p style={styles.error}>{error}</p>}
      </div>

      {/* Order Summary */}
      <div style={styles.orderSummary}>
        <h5>Order Summary</h5>
        <ul>
          {Array.isArray(cart) && cart.map((item) => (
            <li key={item._id} style={styles.orderItem}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
        {discount > 0 && <p style={{ color: "green" }}>Discount Applied: -${discount}</p>}
        <p><strong>Total: ${total - discount}</strong></p>
      </div>

      <button onClick={handlePlaceOrder} style={styles.button}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;



