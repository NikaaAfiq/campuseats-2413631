// One row in the cart. It shows data and reports clicks upwards; it owns no state.

function CartItem({ line, onChangeQty, onRemove }) {
    const { item , qty } = line 
    return (
        <li className="cart-line">
            <div>
                <p className="cart-name">{item.name}</p>
                <p className="muted" >${item.price.toFixed(2)} each</p>
            </div>
            <div className="qty">
                <button type="button" className="btn" onClick={() => onChangeQty(item, qty - 1)}>-</button>
                <span>{qty}</span>
                <button type="button" className="btn" onClick={() => {/* TODO: add one */}}>+</button>

            </div>
            <p className="line-total">RM {(item.price * qty).toFixed(2)}</p>
            <button type="button" className="btn btn-remove" onClick={() => onRemove(item)}>Remove</button>
        </li>
    )
}

export default CartItem
