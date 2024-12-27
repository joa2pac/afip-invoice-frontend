import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://localhost:3001/api/facturas", {
      method: "GET",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al obtener las facturas." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Error interno del servidor." },
      { status: 500 }
    );
  }
}
