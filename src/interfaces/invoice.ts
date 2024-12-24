export interface Cliente {
  docTipo: number; // Tipo de documento (Ej. 96)
  docNro: number; // Número de documento (Ej. 12345678)
}

export interface IvaDetalle {
  Id: number; // Identificador del IVA (Ej. 5)
  BaseImp: number; // Base imponible (Ej. 100.0)
  Importe: number; // Importe del IVA (Ej. 21.0)
}

export interface Detalles {
  concepto: number; // Concepto (Ej. 3)
  impTotal: number; // Importe total (Ej. 121.0)
  impNeto: number; // Importe neto (Ej. 100.0)
  impIVA: number; // Importe del IVA (Ej. 21.0)
  moneda: string; // Moneda (Ej. "PES")
  cotizacion: number; // Cotización (Ej. 1)
  iva: IvaDetalle[]; // Detalle del IVA
}

export interface Fechas {
  comprobante: string; // Fecha del comprobante (YYYYMMDD)
  vencimiento: string; // Fecha de vencimiento (YYYYMMDD)
  servDesde?: string; // (Opcional) Fecha de inicio del servicio (YYYYMMDD)
  servHasta?: string; // (Opcional) Fecha de fin del servicio (YYYYMMDD)
}

export interface FormData {
  puntoDeVenta: number; // Punto de venta (Ej. 1)
  tipoDeComprobante: number; // Tipo de comprobante (Ej. 6)
  cliente: Cliente; // Información del cliente
  detalles: Detalles; // Detalles de la factura
  fechas: Fechas; // Fechas relacionadas con la factura
}
