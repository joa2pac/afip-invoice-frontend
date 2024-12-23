// src/app/page.tsx
"use client";

import { useState } from "react";

export default function HomePage() {
  const [formData] = useState({
    puntoDeVenta: 1,
    tipoDeComprobante: 6,
    cliente: {
      docTipo: 96,
      docNro: 12345678,
    },
    detalles: {
      concepto: 3,
      impTotal: 121.0,
      impNeto: 100.0,
      impIVA: 21.0,
      moneda: "PES",
      cotizacion: 1,
      iva: [
        {
          Id: 5,
          BaseImp: 100.0,
          Importe: 21.0,
        },
      ],
    },
    fechas: {
      comprobante: "20241220",
      vencimiento: "20241230",
      servDesde: "20241220",
      servHasta: "20241230",
    },
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <h1>Generar Factura</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Generar Factura</button>
      </form>

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
