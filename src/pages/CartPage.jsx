import { useNavigate } from "react-router";
import useCart from "../hooks/useCart";
import CartItem from "../components/CartItem";
import CheckoutForm from "../components/CheckoutForm";

function CartPage() {
  const { cart, total, handleChangeQty, handleRemove, handlePlaceOrder } = useCart();
  const navigate = useNavigate();

  function onPlaceOrder(details) {
    handlePlaceOrder(details);
    navigate("/orders");
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your cart is empty. Pick something from the menu.</h2>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="card">
        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem
              key={line.item.id}
              line={line}
              onChangeQty={handleChangeQty}
              onRemove={handleRemove}
            />
          ))}
        </ul>
        <p className="cart-total">Total: RM {total.toFixed(2)}</p>
      </div>
      <CheckoutForm onPlaceOrder={onPlaceOrder} />
    </div>
  );
}

export default CartPage;