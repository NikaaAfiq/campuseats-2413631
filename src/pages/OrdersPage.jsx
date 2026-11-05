import useCart from "../hooks/useCart";

export default function OrdersPage() {
  const { orders } = useCart();

  if (orders.length === 0) return <p className="muted">No orders yet.</p>;

  return (
    <>
      <h2 className="section-title">Your orders</h2>
      <ul className="order-list">
        {[...orders].reverse().map((o) => (
          <li key={o.id} className="card">
            <h3>{o.name} · {o.mahallah}</h3>
            <p className="muted">Pickup: {o.pickupTime}</p>
            <ul>
              {o.items.map((l) => (
                <li key={l.item.id}>{l.qty} * {l.item.name}</li>
              ))}
            </ul>
            <p className="price">Total: RM {o.total.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </>
  );
}