function MenuItemCard () {
    const item = {
        name: "Ayam Gepuk",
        price: 5.00,
        description: "Spicy fried chicken with rice",
        available: true,
    };

    return (
        <article className="card menu-card">
            <div className = "thumb" aria-hidden="true">
                {item.name.charAt(0)}
            </div>
            <h3>{item.name}</h3>
            <p className="muted">{item.description}</p>
            <p className="price">MYR {item.price.toFixed(2)}</p>
            <button className="btn" disabled={!item.available}>
                {item.available ? "Add to Cart" : "Sold Out"}
            </button>
        </article>
    );
}

export default MenuItemCard;
