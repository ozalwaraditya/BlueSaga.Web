import { useState, useMemo } from "react";
import "./ProductCard.css";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { shopping_cart_api } from "../../utility/url";
import axios from "axios";

function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();

  // Calculate available stock once
  const availableStock = useMemo(
    () => product.stockQuantity - product.reservedQuantity,
    [product.stockQuantity, product.reservedQuantity]
  );

  // Calculate max quantity user can order
  const maxOrderQty = useMemo(
    () => Math.min(10, availableStock),
    [availableStock]
  );

  const isInStock = availableStock > 0;
  const isAtMaxQty = qty >= maxOrderQty;

  const increase = () => {
    if (qty < maxOrderQty) {
      setQty((q) => q + 1);
    }
  };

  const decrease = () => {
    if (qty > 1) {
      setQty((q) => q - 1);
    }
  };

  const addToCart = async () => {
    console.log("Add to cart", product.id || product.productId, qty);
    if (!isAuthenticated || currentUser == null) {
      navigate("/login");
    }

    const payload = {
      cartHeader: {
        userId: currentUser.userId,
      },
      cartDetails: [
        {
          productId: product.productId,
          count: qty,
        },
      ],
    };

    try {
      const response = await axios.post(
        shopping_cart_api + "/api/Cart/add-item",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Add to cart response:", response.data);
    } catch (error) {
      console.error("Error:", error.response || error.message);
    }

    setShowModal(false);
    setQty(1); // Reset quantity after adding to cart
  };

  const handleModalClose = () => {
    setShowModal(false);
    setQty(1); // Reset quantity when closing modal
  };

  return (
    <>
      <div className="product-card">
        <img
          src={product.image || product.productImageUrl}
          alt={product.name || product.productName}
        />
        <div className="sub-detail">
          <h4>{product.name || product.productName}</h4>
          <h6>₹{product.price}</h6>
        </div>

        {isInStock ? (
          <span className="in-stock">In Stock</span>
        ) : (
          <span className="out-of-stock">Out of Stock</span>
        )}

        <button className="btn-details" onClick={() => setShowModal(true)}>
          Details
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <img
              src={product.image || product.productImageUrl}
              alt={product.name || product.productName}
            />

            <h3>{product.name || product.productName}</h3>
            <p className="description">{product.description}</p>

            <p>
              <strong>Category:</strong> {product.categoryName || "Category"}
            </p>
            <p>
              <strong>Stock:</strong> {availableStock}
            </p>

            {isInStock && (
              <>
                <div className="qty-control">
                  <button onClick={decrease} disabled={qty <= 1}>
                    −
                  </button>
                  <span>{qty}</span>
                  <button onClick={increase} disabled={isAtMaxQty}>
                    +
                  </button>
                </div>

                {isAtMaxQty && (
                  <span className="limit-message">
                    Reached your one-time order limit for this product
                  </span>
                )}

                <button className="btn-add" onClick={addToCart}>
                  Add to Cart
                </button>
              </>
            )}

            {!isInStock && (
              <p className="out-of-stock-message">
                This product is currently out of stock
              </p>
            )}

            <button className="btn-close" onClick={handleModalClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;