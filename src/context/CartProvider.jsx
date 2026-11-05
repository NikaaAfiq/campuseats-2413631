import { CartContext } from "./cart-context";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [orders, setOrders] = useLocalStorage("orders", []);

  const cartCount = cart.reduce((sum, l) => sum + l.qty, 0);
  const total = cart.reduce((sum, l) => sum + l.item.price * l.qty, 0);

  // handlers
  function handleAddToCart(item) {
    setCart((prev) => {
      const existing = prev.find((l) => l.item.id === item.id);
      if (existing) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  }

function handlePlaceOrder(details) {
  setOrders((prev) => [
    ...prev,
    { id: Date.now(), ...details, items: cart, total },
  ]);
  setCart([]);
}

  function handleChangeQty(item, qty) {
    setCart((prev) =>
      prev
        .map((l) => (l.item.id === item.id ? { ...l, qty } : l))
        .filter((l) => l.qty > 0),
    );
  }

  function handleRemove(item) {
    setCart((prev) => prev.filter((l) => l.item.id !== item.id));
  }

  const value = {
    cart, orders, cartCount, total,
    handleAddToCart, handlePlaceOrder, handleChangeQty, handleRemove,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
