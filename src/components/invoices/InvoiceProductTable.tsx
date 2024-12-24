"use client";

import React, { useState } from "react";

interface Product {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

const InvoiceProductsTable = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = () => {
    setProducts((prev) => [
      ...prev,
      { id: prev.length + 1, nombre: "", cantidad: 1, precio: 0, subtotal: 0 },
    ]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProductChange = (id: number, field: string, value: any) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              [field]: value,
              subtotal: product.cantidad * product.precio,
            }
          : product
      )
    );
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Productos</h2>
      <table className="min-w-full border-collapse border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Producto</th>
            <th className="p-2 text-left">Cantidad</th>
            <th className="p-2 text-left">Precio</th>
            <th className="p-2 text-left">Subtotal</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="p-2">
                <input
                  type="text"
                  value={product.nombre}
                  onChange={(e) =>
                    handleProductChange(product.id, "nombre", e.target.value)
                  }
                  className="border rounded p-1"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  value={product.cantidad}
                  onChange={(e) =>
                    handleProductChange(product.id, "cantidad", +e.target.value)
                  }
                  className="border rounded p-1"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  value={product.precio}
                  onChange={(e) =>
                    handleProductChange(product.id, "precio", +e.target.value)
                  }
                  className="border rounded p-1"
                />
              </td>
              <td className="p-2">{product.subtotal.toFixed(2)}</td>
              <td className="p-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() =>
                    setProducts((prev) =>
                      prev.filter((p) => p.id !== product.id)
                    )
                  }
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={handleAddProduct}
      >
        Añadir Producto
      </button>
    </div>
  );
};

export default InvoiceProductsTable;
