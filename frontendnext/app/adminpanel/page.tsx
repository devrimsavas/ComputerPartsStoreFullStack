import AdminProductTable from "@/components/AdminProductTable";
import { GET_ALL_PRODUCTS } from "@/lib/constants";

async function getProducts() {
  const res = await fetch(GET_ALL_PRODUCTS, { cache: "no-store" });
  const data = await res.json();
  return data.parts;
}

export default async function AdminPanelPage() {
  const products = await getProducts();

  const isAdmin = true; // hardcoded for now

  return <AdminProductTable parts={products} isAdmin={isAdmin} />;
}
