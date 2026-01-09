import { useEffect, useState } from "react";
import "./ShoppingCart.css";
import ShoppingCartItem from "../../components/customer/ShoppingCartItem";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { shopping_cart_api } from "../../utility/url";

function ShoppingCart() {
  const [loading, setLoading] = useState(true);
  const [couponLoading, setCouponLoading] = useState(false);
  const {
    getCart,
    totalCount,
    discountAmount,
    finalAmount,
    cartItems,
    isCouponApplied,
  } = useCart();
  const { currentUser } = useAuth();
  const [couponCode, setCouponCode] = useState("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (currentUser) {
      getCart();
      setLoading(false);
    }
  }, [currentUser]);

  const handleApply = async () => {
    setCouponLoading(true);
    setStatus("");
    setMessage("");

    try {
      const response = await axios.post(
        shopping_cart_api + "/api/Cart/applycoupon",
        {
          userId: currentUser.userId,
          couponCode: couponCode,
        }
      );

      if (response.data.isSuccess) {
        setStatus("success");
        setMessage("Coupon applied successfully!!!");

        setTimeout(() => {
          setStatus(null);
          setMessage("");
        }, 1000);
        await getCart();
      } else {
        setStatus("error");
        setMessage(response.data.message || "Invalid coupon");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = async () => {
    setCouponLoading(true);
    setStatus("");
    setMessage("");

    try {
      const response = await axios.post(
        shopping_cart_api + "/api/Cart/applycoupon",
        {
          userId: currentUser.userId,
          couponCode: "",
        }
      );

      if (response.data.isSuccess) {
        setStatus("success");
        setMessage("Coupon removed successfully");
        setCouponCode("");
        await getCart();

        setTimeout(() => {
          setStatus(null);
          setMessage("");
        }, 1000);
      } else {
        setStatus("error");
        setMessage(response.data.message || "Failed to remove coupon");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleCheckout = () => {
    console.log("Proceed to checkout");
  };

  const removeFromCart = async (productId, userId) => {
    try {
      const response = await axios.delete(
        shopping_cart_api + `/api/Cart/remove/${productId}?userId=${userId}`
      );
      await getCart();

      console.log("Removed:", response.data);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="listing-window">
        {cartItems.map((item) => (
          <ShoppingCartItem
            key={item.cartDetailId}
            image={item.image}
            name={item.productName}
            price={item.price}
            quantity={item.count}
            onRemove={() => {
              removeFromCart(item.productId, currentUser.userId);
            }}
          />
        ))}
      </div>

      <div className="side-panel">
        <div className="coupon-window">
          <h3>Coupon Service</h3>

          <div className="coupon-input-wrapper">
            {
              !isCouponApplied &&
              <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              disabled={isCouponApplied || couponLoading}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            />
            }

            {!isCouponApplied ? (
              <button
                onClick={handleApply}
                disabled={couponLoading || !couponCode.trim()}
              >
                {couponLoading ? "Applying..." : "Apply"}
              </button>
            ) : (
              <button onClick={handleRemoveCoupon} disabled={couponLoading}>
                {couponLoading ? "Removing..." : "Remove"}
              </button>
            )}
          </div>

          {status && <p className={`coupon-message ${status}`}>{message}</p>}
        </div>

        <div className="sub-total">
          <h4 className="sub-title">Order Summary</h4>

          <div className="summary-row">
            <span>Total Price</span>
            <span>₹{totalCount}</span>
          </div>

          <div className="summary-row">
            <span>Discount Amount</span>
            <span>₹{discountAmount}</span>
          </div>

          <b>
            <div className="summary-row final-row">
              <span>Final Total</span>
              <span>₹{finalAmount}</span>
            </div>
          </b>

          <button onClick={handleCheckout} className="checkout-btn">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
