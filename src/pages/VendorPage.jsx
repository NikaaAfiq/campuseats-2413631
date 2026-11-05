import { useParams, Link, useSearchParams } from "react-router";
import {  useVendors } from "../hooks/useVendors.js";
import MenuList from "../components/MenuList.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";

export default function VendorPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { vendors, loading, error, reload } = useVendors();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const vendor = vendors.find((v) => v.id === id);
  if (!vendor) {
    return (
      <div>
        <h2>Vendor not found</h2>
        <Link to="/">Go back</Link>
      </div>
    );
  }

  const menu = vendor.menu ?? [];
  const categories = ["All", ...new Set(menu.map((item) => item.category))];

  const cat = searchParams.get("cat");
  const selected = categories.includes(cat) ? cat : "All";

  const visible =
   selected === "All" ? menu : menu.filter((i)=> i.category === selected);

   function handleSelect(c) {
    if ( c === "All") setSearchParams({});
    else setSearchParams({ cat : c });
   }

   return (
    <>
      <h2 className="section-title">{vendor.name}</h2>
      <CategoryFilter
       categories={categories}
       selected={selected}
       onSelect={handleSelect}
       />
      <MenuList items={visible} />
    </>
   )
}