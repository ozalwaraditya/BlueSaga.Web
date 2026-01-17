import { Navigate, useLocation, useParams } from "react-router-dom";
import "./OrderDetails.css";
import { OrderStatus, PaymentStatus } from "../../utility/enum";

function OrderDetails() {
  const { id } = useParams();
  const location = useLocation();
  const orderData = location.state;

  console.log("location.state: -", location.state);
  console.log("Order ID from params:", id);

  if (!location.state) {
    return <Navigate to="/my-orders" replace />;
  }
  return (
    <>
      <div className="back-btn" onClick={() => window.history.back()}>
        ← Back to My Orders
      </div>
      <div className="order-cart">
        <div>
          <h3>Order Details</h3>
        </div>
        <hr />
        {orderData && (
          <div className="order-information">
            <p>Order ID: {orderData.orderId}</p>
            <p>Order Placer: {orderData.fullName}</p>
            <p>Order Status: {OrderStatus[orderData.orderStatus]}</p>
            <p>Payment Status: {PaymentStatus[orderData.paymentStatus]}</p>
            <p>Total Amount: {orderData.totalAmount}</p>
            {/* etc */}
          </div>
        )}
      </div>
    </>
  );
}

export default OrderDetails;
