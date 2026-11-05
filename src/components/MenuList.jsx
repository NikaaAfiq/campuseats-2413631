import useCart from "../hooks/useCart";
import MenuItemCard from "./MenuItemCard";

function MenuList({ items }) {
  const { handleAddToCart } = useCart();

  if (items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>;
  }

  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} onAdd={handleAddToCart} />
      ))}
    </div>
  );
}

export default MenuList;