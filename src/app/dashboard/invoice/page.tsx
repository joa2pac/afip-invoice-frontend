"use client";

import { useState } from "react";
import { FormData } from "@/interfaces/invoice"; // Asegúrate de importar la interfaz
import InvoiceForm from "@/components/invoices/InvoiceForm";

export default function InvoicePage() {
  const [response, setResponse] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateInvoice = async (formData: FormData) => {
    try {
      const res = await fetch("/api/facturacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al generar la factura");
      setResponse(data);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Facturación</h1>
      <InvoiceForm onSubmit={handleGenerateInvoice} />

      {response && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Factura Generada:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "2rem", color: "red" }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
