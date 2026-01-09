import axios from "axios";
import { createContext, useState } from "react";
import { shopping_cart_api } from "../utility/url";
import { useAuth } from "../hooks/useAuth";

export const CartContext = createContext(null);

function CartProvider({ children }) {
  const [totalCount, setTotalCount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useAuth();
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const getCart = async () => {
    // Add null check here
    if (!currentUser?.userId) return;

    try {
      const response = await axios.get(
        `${shopping_cart_api}/api/Cart/getcart/${currentUser.userId}`
      );
      const data = response.data.response;
      console.log("userid : ", currentUser.userId);
      console.log("data ", data);
      setIsCouponApplied(data.cartHeader.couponCode != null);
      setDiscountAmount(data.discountAmount);
      setTotalCount(data.totalAmount);
      setFinalAmount(data.finalAmount);
      setCartItems(data.cartDetails);
    } catch (error) {
      console.log("Failed to fetch cart", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        getCart,
        totalCount,
        discountAmount,
        finalAmount,
        cartItems,
        isCouponApplied,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
