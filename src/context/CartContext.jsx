import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { shopping_cart_api } from "../utility/url";
import { useAuth } from "../hooks/useAuth";

export const CartContext = createContext(null);

function CartProvider({ children }) {
  const [totalCount, setTotalCount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartHeader, setCartHeader] = useState(null);
  const { currentUser } = useAuth();
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const getCart = async () => {
    if (!currentUser?.userId) return;

    try {
      const response = await axios.get(
        `${shopping_cart_api}/api/Cart/getcart/${currentUser.userId}`
      );

      const data = response.data.response;

      setCartHeader(data.cartHeader);
      setIsCouponApplied(data.cartHeader?.couponCode != null);
      setDiscountAmount(data.discountAmount || 0);
      setTotalCount(data.totalAmount || 0);
      setFinalAmount(data.finalAmount || 0);
      setCartItems(data.cartDetails || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        totalCount,
        discountAmount,
        finalAmount,
        cartItems,
        cartHeader,
        isCouponApplied,
        getCart,
        setCartItems,
        setTotalCount,
        setDiscountAmount,
        setFinalAmount,
        setIsCouponApplied,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
