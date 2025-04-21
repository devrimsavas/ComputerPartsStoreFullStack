import { GET_ALL_PRODUCTS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

interface IProduct {
  id: number;
  product: string;
  qty_instock: number;
  price: number;
  image?: string;
  description?: string;
  type: string;
}

export default async function ProductsPage() {
  const response = await fetch(GET_ALL_PRODUCTS, { cache: "no-store" });

  if (!response.ok) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold text-red-600">
          Error Fetching Products
        </h1>
      </main>
    );
  }

  //const { data: products }: { data: IProduct[] } = await response.json();
  const { parts: products }: { parts: IProduct[] } = await response.json();

  return (
    <main className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow p-4">
          {product.image && (
            <Image
              src={product.image}
              alt={product.product}
              width={300}
              height={200}
              className="w-full h-48 object-contain mb-4"
            />
          )}
          <h2 className="text-xl font-semibold mb-2">{product.product}</h2>
          <p className="text-gray-700 mb-1">Type: {product.type}</p>
          <p className="text-gray-900 font-bold mb-2">R {product.price}</p>
          <p className="text-sm text-gray-500 mb-4">
            {product.qty_instock} in stock
          </p>

          {/*  Details button */}
          <Link
            href={`/products/${product.id}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>
      ))}
    </main>
  );
}
