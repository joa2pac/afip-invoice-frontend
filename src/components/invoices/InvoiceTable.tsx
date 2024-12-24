import React from "react";

interface InvoiceTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invoices: any[]; // Cambiar a un tipo más específico si tienes los datos
}

const InvoiceTable = ({ invoices }: InvoiceTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice, index) => (
          <tr key={index}>
            <td>{invoice.id}</td>
            <td>{invoice.cliente}</td>
            <td>{invoice.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
