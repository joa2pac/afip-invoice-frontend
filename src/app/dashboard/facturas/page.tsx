"use client";

import { useEffect, useState } from "react";

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
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener facturas desde el backend
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/facturas");
      if (!res.ok) throw new Error("Error al obtener las facturas.");
      const { data } = await res.json(); // Accede directamente a la clave `data`
      setInvoices(data); // Asegúrate de que `data` sea un arreglo
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchInvoices();
  }, []);

  if (loading) return <div>Cargando facturas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Bandeja de Facturas</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border">
          <thead>
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
            {Array.isArray(invoices) && invoices.length > 0 ? (
              invoices.map((invoice, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 border">{invoice.puntoDeVenta}</td>
                  <td className="p-2 border">{invoice.tipoDeComprobante}</td>
                  <td className="p-2 border">{invoice.numeroComprobante}</td>
                  <td className="p-2 border">{invoice.fechaComprobante}</td>
                  <td className="p-2 border">${invoice.impTotal.toFixed(2)}</td>
                  <td className="p-2 border">{invoice.estado}</td>
                  <td className="p-2 border">{invoice.cae}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  No hay facturas disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesPage;
