import "./ShoppingCartItem.css";

function ShoppingCartItem({
  image,
  name,
  price,
  quantity,
  onRemove,
}) {
  return (
    <div className="cart-item">
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="cart-item-image"
      />

      {/* Product Info */}
      <div className="cart-item-details">
        <h4 className="cart-item-name">{name}</h4>
        <p className="cart-item-price">₹ {price}</p>
      </div>

      {/* Quantity */}
      <div className="cart-item-qty">
        x {quantity}
      </div>

      {/* Remove Button */}
      <button
        className="cart-item-remove"
        onClick={onRemove}
      >
        Remove
      </button>
    </div>
  );
}

export default ShoppingCartItem;
