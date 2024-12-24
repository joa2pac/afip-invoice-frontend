"use client";

import { useState } from "react";
import { FormData } from "@/interfaces/invoice";

interface InvoiceFormProps {
  onSubmit: (formData: FormData) => void;
}

const tipoDeComprobanteOptions = [
  { value: 1, label: "Factura A" },
  { value: 2, label: "Nota de Débito A" },
  { value: 3, label: "Nota de Crédito A" },
  { value: 6, label: "Factura B" },
  { value: 7, label: "Nota de Débito B" },
  { value: 8, label: "Nota de Crédito B" },
  { value: 11, label: "Factura C" },
  { value: 12, label: "Nota de Débito C" },
  { value: 13, label: "Nota de Crédito C" },
  { value: 201, label: "Factura de Crédito Electrónica MiPyMEs A" },
  { value: 206, label: "Factura de Crédito Electrónica MiPyMEs B" },
];

const docTipoOptions = [
  { value: 80, label: "CUIT" },
  { value: 86, label: "CUIL" },
  { value: 96, label: "DNI" },
  { value: 99, label: "Consumidor Final" },
];

const InvoiceForm = ({ onSubmit }: InvoiceFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    puntoDeVenta: 1,
    tipoDeComprobante: 1,
    cliente: {
      docTipo: 80,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "tipoDeComprobante" || name === "docTipo" ? +value : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar docTipo según tipoDeComprobante
    const { tipoDeComprobante, cliente } = formData;

    if (tipoDeComprobante === 1 && cliente.docTipo !== 80) {
      alert("Las Facturas A solo permiten CUIT (docTipo: 80).");
      return;
    }

    if (tipoDeComprobante === 6 && ![80, 96, 99].includes(cliente.docTipo)) {
      alert(
        "Las Facturas B permiten CUIT (80), DNI (96) o Consumidor Final (99)."
      );
      return;
    }

    // Llamar a la función onSubmit con los datos validados
    onSubmit(formData);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Datos Generales</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Punto de Venta</label>
            <input
              type="number"
              name="puntoDeVenta"
              value={formData.puntoDeVenta}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Tipo de Comprobante
            </label>
            <select
              name="tipoDeComprobante"
              value={formData.tipoDeComprobante}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
            >
              {tipoDeComprobanteOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-4">Cliente</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">
              Tipo de Documento
            </label>
            <select
              name="docTipo"
              value={formData.cliente.docTipo}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  cliente: { ...prev.cliente, docTipo: +e.target.value },
                }))
              }
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
            >
              {docTipoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Número de Documento
            </label>
            <input
              type="number"
              name="docNro"
              value={formData.cliente.docNro}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  cliente: { ...prev.cliente, docNro: +e.target.value },
                }))
              }
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generar Factura
        </button>
      </form>
    </div>
  );
};

export default InvoiceForm;
