import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { order_api } from "../../utility/url";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Orders() {
  const [orderData, setOrderData] = useState(null);
  const [formdata, setFormdata] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { currentUser } = useAuth();
  const location = useLocation();
  const { cartHeaderId, userId, finalAmount } = location.state || {};
  const navigate = useNavigate();
  const { setCartItems } = useCart();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setInitialLoading(true);

        const fetchPromise = axios
          .post(
            `${order_api}/api/order/checkout`,
            {
              OrderId: 0,
              CartHeaderId: cartHeaderId,
              UserId: currentUser.userId,
              FullName: "",
              PhoneNumber: 0,
              Address: "",
              TotalAmount: finalAmount,
              OrderStatus: 0,
              PaymentStatus: 0,
            },
            { withCredentials: true }
          )
          .then((res) => {
            const data = res.data;

            if (data.isSuccess) {
              const order = data.response;

              setOrderData(order);
              setFormdata({
                fullName: order.fullName || "",
                phoneNumber: order.phoneNumber
                  ? order.phoneNumber.toString()
                  : "",
                address: order.address || "",
              });

              return data;
            }

            throw new Error(data.message || "Failed to initialize checkout");
          });

        await toast.promise(fetchPromise, {
          loading: "Loading checkout...",
          success: "Checkout ready!",
          error: (err) => err.message,
        });
      } catch (error) {
        console.error("Checkout error:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    if (currentUser?.userId) fetchOrderData();
  }, [currentUser, cartHeaderId, finalAmount]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "").slice(0, 15);
      setFormdata((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validatePhoneNumber = (phone) => {
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
  };

  const handleDiscardOrder = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const discardPromise = axios
        .delete(
          `${order_api}/api/order/discard-order?orderId=${orderData?.orderId}`,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          const data = response.data;

          if (data.isSuccess) {
            setTimeout(() => {
              window.location.href = "/shopping-cart";
            }, 1000);
            return data;
          }
          throw new Error(data.message || "Failed to discard order");
        });

      await toast.promise(discardPromise, {
        loading: "Discarding order...",
        success: "Order discarded successfully!",
        error: (err) => err.message || "Failed to discard order",
      });
    } catch (error) {
      console.error("Discard order error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    if (!formdata.fullName || !formdata.phoneNumber || !formdata.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!validatePhoneNumber(formdata.phoneNumber)) {
      toast.error("Please enter a valid phone number (10-15 digits)");
      return;
    }

    // Update order with complete information before showing modal
    setLoading(true);

    try {
      const phoneNumberAsNumber = parseInt(formdata.phoneNumber, 10);

      const updatePromise = axios.post(
        `${order_api}/api/order/checkout`,
        {
          OrderId: orderData?.orderId || 0,
          CartHeaderId: orderData?.cartHeaderId,
          UserId: currentUser.userId,
          FullName: formdata.fullName,
          PhoneNumber: phoneNumberAsNumber,
          Address: formdata.address,
          TotalAmount: orderData?.totalAmount || 0,
          OrderStatus: orderData?.orderStatus || 0,
          PaymentStatus: orderData?.paymentStatus || 0,
        },
        { withCredentials: true }
      );

      const response = await toast.promise(updatePromise, {
        loading: "Updating order information...",
        success: "Order updated successfully!",
        error: (err) => err.message || "Failed to update order",
      });

      const data = response.data;

      if (data.isSuccess) {
        const updatedOrder = data.response;
        setOrderData(updatedOrder);
        setShowModal(true);
      } else {
        throw new Error(data.message || "Failed to update order");
      }
    } catch (error) {
      console.error("Update order error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const placeOrderPromise = axios.post(
        `${order_api}/api/order/place-order`,
        {
          OrderId: orderData?.orderId || 0,
        },
        { withCredentials: true }
      );

      const response = await toast.promise(placeOrderPromise, {
        loading: "Payment in process...",
        success: "Payment done successfully!",
        error: (err) => err.message || "Failed to pay",
      });

      const data = response.data;

      if (data.isSuccess) {
        // setShowModal(true);
        navigate;
      } else {
        throw new Error(data.message || "Failed to payment order");
      }
    } catch (error) {
      console.error("Payment order error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (paymentSuccess) => {
    if (loading) return;
    setLoading(true);

    const endpoint = paymentSuccess ? "/place-order" : "/fail-order";

    if (!orderData?.orderId) {
      toast.error("Order ID is missing");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${order_api}/api/order${endpoint}?orderId=${orderData.orderId}`,
        { withCredentials: true }
      );

      const data = response.data;

      if (data.isSuccess) {
        toast.success(
          paymentSuccess
            ? "Order placed successfully!"
            : "Payment failed. Order recorded."
        );
        setShowModal(false);
        setTimeout(() => {
          navigate("/");
        }, 100);
        setCartItems([]);
      } else {
        throw new Error(data.message || "Failed to process order");
      }
    } catch (error) {
      console.error("Place order error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to process order"
      );
    } finally {
      setLoading(false);
    }
  };
  if (initialLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid #e0e0e0",
            borderTop: "4px solid #007bff",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <p style={{ marginTop: "20px", color: "#666" }}>
          Loading order details...
        </p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "30px 25px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#333",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          Order Confirmation Page
        </h3>

        <div>
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={formdata.fullName}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "12px 15px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "14px",
              boxSizing: "border-box",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#007bff";
              e.target.style.boxShadow = "0 0 5px rgba(0, 123, 255, 0.3)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ccc";
              e.target.style.boxShadow = "none";
            }}
          />

          <input
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number (10-15 digits)"
            value={formdata.phoneNumber}
            onChange={handleInputChange}
            required
            pattern="[0-9]{10,15}"
            inputMode="numeric"
            maxLength="15"
            style={{
              width: "100%",
              padding: "12px 15px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "14px",
              boxSizing: "border-box",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#007bff";
              e.target.style.boxShadow = "0 0 5px rgba(0, 123, 255, 0.3)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ccc";
              e.target.style.boxShadow = "none";

              if (e.target.value && !validatePhoneNumber(e.target.value)) {
                e.target.style.borderColor = "#dc3545";
                toast.error("Phone number must be 10-15 digits");
              }
            }}
          />

          <input
            name="address"
            type="text"
            placeholder="Address"
            value={formdata.address}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "12px 15px",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "14px",
              boxSizing: "border-box",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#007bff";
              e.target.style.boxShadow = "0 0 5px rgba(0, 123, 255, 0.3)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ccc";
              e.target.style.boxShadow = "none";
            }}
          />

          <div
            style={{
              borderTop: "1px solid #e0e0e0",
              paddingTop: "20px",
              marginBottom: "20px",
            }}
          >
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "15px",
                color: "#333",
              }}
            >
              Order Information
            </h4>
            <p
              style={{ marginBottom: "10px", color: "#555", fontSize: "14px" }}
            >
              <strong>Order Id:</strong> {orderData?.orderId || "N/A"}
            </p>
            <p style={{ marginBottom: "0", color: "#555", fontSize: "14px" }}>
              <strong>Final Pricing:</strong> ₹{orderData?.totalAmount || 0}
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={handleDiscardOrder}
              disabled={loading}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: loading ? "#999" : "#dc3545",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background-color 0.3s, transform 0.2s",
              }}
              onMouseOver={(e) =>
                !loading && (e.target.style.backgroundColor = "#c82333")
              }
              onMouseOut={(e) =>
                !loading && (e.target.style.backgroundColor = "#dc3545")
              }
            >
              {loading ? "Processing..." : "Discard Order"}
            </button>

            <button
              type="button"
              onClick={handleConfirmOrder}
              x
              disabled={loading}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: loading ? "#999" : "#007bff",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background-color 0.3s, transform 0.2s",
              }}
              onMouseOver={(e) =>
                !loading && (e.target.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                !loading && (e.target.style.backgroundColor = "#007bff")
              }
            >
              {loading ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            padding: "20px",
          }}
          onClick={() => !loading && setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "30px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => {
              console.log("Confirm Payment");
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#333",
                fontSize: "22px",
                fontWeight: "600",
              }}
            >
              Confirm Payment
            </h3>

            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <p
                style={{
                  color: "#666",
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
              >
                Total Amount
              </p>
              <h2
                style={{
                  color: "#007bff",
                  fontSize: "32px",
                  fontWeight: "700",
                  margin: 0,
                }}
              >
                ₹{orderData?.totalAmount || 0}
              </h2>
            </div>

            <p
              style={{
                textAlign: "center",
                color: "#666",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              Choose payment status for this order:
            </p>

            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <button
                onClick={() => handlePlaceOrder(false)}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "none",
                  borderRadius: "6px",
                  backgroundColor: loading ? "#999" : "#dc3545",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                Fail Payment
              </button>

              <button
                onClick={() => handlePlaceOrder(true)}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "none",
                  borderRadius: "6px",
                  backgroundColor: loading ? "#999" : "#28a745",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                Confirm Payment
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                backgroundColor: "transparent",
                color: "#666",
                fontSize: "14px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Orders;
