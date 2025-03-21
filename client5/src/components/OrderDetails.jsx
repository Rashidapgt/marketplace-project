import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "./store/OrderSlice";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, isLoading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderDetails(orderId));
  }, [dispatch, orderId]);

  return (
    <div>
      <h2>Order Details</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {orderDetails && (
        <div>
          <p>Order ID: {orderDetails._id}</p>
          <p>Total Amount: ${orderDetails.totalAmount}</p>
          <p>Status: {orderDetails.status}</p>
          <h3>Items:</h3>
          <ul>
            {orderDetails.items.map((item) => (
              <li key={item._id}>
                {item.name} - {item.quantity} x ${item.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
