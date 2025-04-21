"use client";

export default function AddToCartButton() {
  const handleClick = () => {
    console.log("Add to cart logic will go here");
    // You can later integrate cart state, API call, etc.
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Add to Cart
    </button>
  );
}
