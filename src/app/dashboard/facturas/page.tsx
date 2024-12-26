"use client";

import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";

interface Invoice {
  puntoDeVenta: number;
  tipoDeComprobante: number;
  numeroComprobante: number;
  fechaComprobante: string;
  impTotal: number;
  impNeto: number;
  impIVA: number;
  moneda: string;
  cotizacion: number;
  cae: string;
  vencimientoCAE: string;
  estado: string;
}

const InvoicesPage = () => {
  // Estado para las facturas
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 5; // Cantidad de elementos por página
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Manejo de errores

  // Obtener datos de la API
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/facturas");
      if (!res.ok) throw new Error("Error al obtener las facturas.");
      const { data } = await res.json(); // Obtener facturas del campo `data`
      setInvoices(data || []); // Asegurar que siempre sea un array
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Llamar al endpoint al cargar la página
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Calcular datos para la paginación
  const totalItems = invoices.length; // Total de elementos
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Total de páginas
  const startIndex = (currentPage - 1) * itemsPerPage; // Índice inicial
  const endIndex = startIndex + itemsPerPage; // Índice final
  const currentItems = invoices.slice(startIndex, endIndex); // Elementos actuales

  // Manejador para cambiar de página
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Cargando facturas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Bandeja de Facturas</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2 text-left border">Punto de Venta</th>
              <th className="p-2 text-left border">Tipo de Comprobante</th>
              <th className="p-2 text-left border">Número de Comprobante</th>
              <th className="p-2 text-left border">Fecha de Comprobante</th>
              <th className="p-2 text-left border">Importe Total</th>
              <th className="p-2 text-left border">Estado</th>
              <th className="p-2 text-left border">CAE</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((invoice, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 border">{invoice.puntoDeVenta}</td>
                <td className="p-2 border">{invoice.tipoDeComprobante}</td>
                <td className="p-2 border">{invoice.numeroComprobante}</td>
                <td className="p-2 border">
                  {new Date(
                    `${invoice.fechaComprobante.slice(
                      0,
                      4
                    )}-${invoice.fechaComprobante.slice(
                      4,
                      6
                    )}-${invoice.fechaComprobante.slice(6)}`
                  ).toLocaleDateString("es-ES")}
                </td>
                <td className="p-2 border">${invoice.impTotal.toFixed(2)}</td>
                <td className="p-2 border">{invoice.estado}</td>
                <td className="p-2 border">{invoice.cae}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default InvoicesPage;
