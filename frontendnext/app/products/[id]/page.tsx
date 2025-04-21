
export const dynamic="force-dynamic";
import { GET_ALL_PRODUCTS } from "@/lib/constants";
import { GET_SINGLE_PRODUCT } from "@/lib/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

type Props = {
  params: { id: string };
};

const API_URL = GET_ALL_PRODUCTS;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // use it if you use raw api
  //const res = await fetch(`${API_URL}/${params.id}`);
  const res = await fetch(`${GET_SINGLE_PRODUCT}/${params.id}`);

  //const json = await res.json();
  //const product = json.data;
  const product = await res.json();

  if (!product) {
    notFound();
  }

  return {
    title: product.product,
    description: product.description || "Product details at TechParts Direct",
  };
}

export default async function ProductPage({ params }: Props) {
  //old raw API
  //const res = await fetch(`${API_URL}/${params.id}`);
  const res = await fetch(`${GET_SINGLE_PRODUCT}/${params.id}`);

  //const json = await res.json();
  //const product = json.data;
  const product = await res.json();

  if (!product) {
    notFound();
  }

  return (
    <main className="p-10 max-w-3xl mx-auto ">
      <h1 className="text-3xl font-bold mb-4 animate__animated animate__backInRight">
        {product.product}
      </h1>
      <p className="text-gray-700 mb-2 ">{product.description}</p>
      <p className="text-gray-900 font-semibold mb-2">Type: {product.type}</p>
      <p className="text-green-600 font-bold mb-2">NOK {product.price}</p>
      <p className="text-sm text-gray-500">{product.qty_instock} in stock</p>
      {product.image && (
        <img
          src={product.image}
          alt={product.product}
          className="w-full max-w-md mt-4 animate__animated animate__backInLeft"
        />
      )}
      <div className="mt-6 flex gap-4">
        <Link
          href="/products"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          ← Back to Products
        </Link>

        {/* Client component */}
        <AddToCartButton />
      </div>
    </main>
  );
}
