import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

function CartPage ({ cart, onChangeQty, onRemove, onPlaceOrder }) {
    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <h2>Your cart is empty. Pick something from the menu.</h2>
            </div>
        )
    }

    const total = cart.reduce((sum, line) => sum + (line.item.price * line.qty), 0); // TODO: derive with cart.reduce(...), never store it in state

    return (
        <div className="cart-layout">
            <div className="card">
                <ul className="card-list">
                    {cart.map((line) => (
                        <CartItem key={line.item.id} line={line}
                            onChangeQty={onChangeQty} onRemove={onRemove} />
                    ))}
                </ul>
                <p className="cart-total">Total: RM {total.toFixed(2)}</p>
            </div>
            <CheckoutForm onPlaceOrder={onPlaceOrder} />
        </div>
    )
}

export default CartPage