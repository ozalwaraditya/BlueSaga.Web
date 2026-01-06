import { useEffect, useState } from "react";
import "./ShoppingCart.css";
import ShoppingCartItem from "../../components/customer/ShoppingCartItem";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { shopping_cart_api } from "../../utility/url";

function ShoppingCart() {
  const [loading, setLoading] = useState(true);
  const { getCart, totalCount, discountAmount, finalAmount, cartItems } =
    useCart();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      getCart();
      setLoading(false);
    }
  }, [currentUser]);

  const handleCheckout = () => {
    console.log("Proceed to checkout");
  };

  if (loading) {
    return (
      <div className="loading-message">
        <p>Loading products...</p>
      </div>
    );
  }

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
          <h4>Coming soon...</h4>
        </div>

        <div className="sub-total">
          <h4 className="sub-title">Order Summary</h4>

          <div className="summary-row">
            <span>Total Price</span>
            <span>{totalCount}</span>
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
