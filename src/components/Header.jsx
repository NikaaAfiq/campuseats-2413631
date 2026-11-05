import { NavLink, Link } from "react-router";
import useCart from "../hooks/useCart.js";

function Header() {
  const { cartCount } = useCart();
  return (
    <header className="header">
      <Link to="/" className="logo-link"><h1 className="logo">CampusEats</h1></Link>
      <nav className="nav">
        <NavLink to="/" end>Vendors</NavLink>
        <NavLink to="/cart">Cart <span className="badge">{cartCount}</span></NavLink>
        <NavLink to="/orders">Orders</NavLink>
      </nav>
    </header>
  );
}
export default Header;