"use client";

import Button from "./Button";

interface Product {
  id: number;
  image: string;
  product: string;
  description: string;
  qty_instock: number;
  price: number;
}

interface Props {
  parts: Product[];
  isAdmin: boolean;
}

const AdminProductTable = ({ parts, isAdmin }: Props) => {
  const handleAdd = () => {
    window.location.href = "/part";
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleEdit = (id: number) => {
    localStorage.setItem("editPartId", id.toString());
    window.location.href = "/part/edit";
  };

  return (
    <section className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel: Products</h1>

      <div className="flex justify-end mb-4 gap-3">
        <Button
          onClick={handleAdd}
          variant="primary"
          disabled={!isAdmin}
          className={isAdmin ? "" : "opacity-50 cursor-not-allowed"}
        >
          ➕ Add Item
        </Button>
        <Button onClick={handleRefresh} variant="secondary">
          🔄 Refresh
        </Button>
      </div>

      <table className="w-full table-auto border text-left shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Image</th>
            <th className="p-2">Product</th>
            <th className="p-2">Description</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Price</th>
            <th className="p-2">Options</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.id} className="border-t">
              <td className="p-2">{part.id}</td>
              <td className="p-2">
                <img src={part.image} alt={part.product} width={60} />
              </td>
              <td className="p-2">{part.product}</td>
              <td className="p-2">{part.description}</td>
              <td className="p-2">
                {part.qty_instock === 0 ? "No Stock" : part.qty_instock}
              </td>
              <td className="p-2">{part.price}</td>
              <td className="p-2">
                <Button
                  onClick={() => handleEdit(part.id)}
                  variant="primary"
                  disabled={!isAdmin}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminProductTable;
