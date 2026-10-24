import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuList from "./components/MenuList.jsx";
import Footer from "./components/Footer.jsx";
import CartPage from "./components/CartPage.jsx";
import { Loading, ErrorMessage } from "./components/Status.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";
import { useEffect, useState } from "react";
import CategoryFilter from "./components/CategoryFilter.jsx";

function App() {
  // state
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [view, setView] = useState("menu");
  const [cart, setCart] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  //useEffect
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch("/api/vendors.json", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setVendors(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  // derived state
  const selectedVendor =
    vendors.find((v) => v.id === selectedVendorId) ?? vendors[0];
    const categories = selectedVendor
    ? ["All", ...new Set(selectedVendor.menu.map((i) => i.category))]
    : ["All"];
  const visibleItems = selectedVendor
    ? selectedVendor.menu.filter(
      (i) => selectedCategory === "All" || i.category === selectedCategory):
    [];
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
    const total = 0; // TODO: same reduce as CartPage
    setLastOrder({ ...App.details, total });
    setCart([]);
    setView("done");
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

  let content;
  if (view === "cart") {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  } else if (view === "done") {
    content = <p>Order placed.</p>; // TODO (B5): show pickup time and total
  } else if (loading) {
    content = <Loading />;
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((k) => k + 1)}
      />
    );
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendor?.id}
                onSelect={(id) => {
                  setSelectedVendorId(id);
                  setSelectedCategory("All");
                }}
              />
            ))}
          </div>
        </section>
        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            />
            <MenuList items={visibleItems} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    );
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView("menu")}
        onShowCart={() => setView("cart")}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  );
}

export default App;
