export const generarFactura = async (formData: FormData) => {
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
    return data;
  } catch (error) {
    throw error;
  }
};
