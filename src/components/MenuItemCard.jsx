function MenuItemCard({ item, onAdd }) {
  return (
    <article className="card menu-card">
      <div className="thumb" aria-hidden="true">
        {item.name.charAt(0)}
      </div>
      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>
      <p className="price">MYR {item.price.toFixed(2)}</p>
      <button className="btn" disabled={!item.available} onClick={() => onAdd(item)}>
        {item.available ? "Add to Cart" : "Sold Out"}
      </button>
    </article>
  );
}

export default MenuItemCard;
