import { useEffect, useState } from "react";
import "./ShoppingCart.css";
import ShoppingCartItem from "../../components/customer/ShoppingCartItem";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { shopping_cart_api } from "../../utility/url";
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
  const [loading, setLoading] = useState(true);
  const [couponLoading, setCouponLoading] = useState(false);
  const {
    getCart,
    totalCount,
    discountAmount,
    finalAmount,
    cartItems,
    cartHeader,
    isCouponApplied,
  } = useCart();
  const { currentUser } = useAuth();
  const [couponCode, setCouponCode] = useState("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      if (currentUser) {
        setLoading(true);
        await getCart();
        setLoading(false);
      }
    };

    loadCart();
  }, [currentUser]);

  useEffect(() => {
    if (cartHeader?.couponCode) {
      setCouponCode(cartHeader.couponCode);
    }
  }, [cartHeader]);

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

        await getCart();

        setTimeout(() => {
          setStatus(null);
          setMessage("");
        }, 1000);
      } else {
        setStatus("error");
        setMessage(response.data.message || "Invalid coupon");
      }
    } catch (error) {
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
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleCheckout = () => {
    if (cartHeader) {
      navigate("/orders", {
        state: {
          cartHeaderId: cartHeader.cartHeaderId,
          userId: cartHeader.userId,
          finalAmount: finalAmount,
        },
      });
    }
  };

  const removeFromCart = async (productId, userId) => {
    try {
      const response = await axios.delete(
        shopping_cart_api + `/api/Cart/remove/${productId}?userId=${userId}`
      );

      await getCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  if (loading) {
    return (
      <div className="cart-loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (!loading && (!cartItems || cartItems.length === 0)) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <button
            className="continue-shopping-btn"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

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
            {!isCouponApplied ? (
              <>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  disabled={couponLoading}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                />
                <button
                  onClick={handleApply}
                  disabled={couponLoading || !couponCode.trim()}
                >
                  {couponLoading ? "Applying..." : "Apply"}
                </button>
              </>
            ) : (
              <>
                <div className="applied-coupon">
                  <span>Applied: {cartHeader?.couponCode}</span>
                </div>
                <button onClick={handleRemoveCoupon} disabled={couponLoading}>
                  {couponLoading ? "Removing..." : "Remove"}
                </button>
              </>
            )}
          </div>

          {status && <p className={`coupon-message ${status}`}>{message}</p>}
        </div>

        <div className="sub-total">
          <h4 className="sub-title">Order Summary</h4>

          <div className="summary-row">
            <span>Total Price</span>
            <span>₹{totalCount.toFixed(2)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="summary-row discount">
              <span>Discount Amount</span>
              <span>-₹{discountAmount.toFixed(2)}</span>
            </div>
          )}

          <b>
            <div className="summary-row final-row">
              <span>Final Total</span>
              <span>₹{finalAmount.toFixed(2)}</span>
            </div>
          </b>

          <button
            onClick={handleCheckout}
            className="checkout-btn"
            disabled={cartItems.length === 0}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
