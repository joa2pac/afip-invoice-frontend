import React from "react";
import Link from "next/link";

interface ActionCardProps {
  iconClass: string; // Clase para el ícono
  title: string; // Título a mostrar
  path: string; // Ruta para la navegación
}

export const ActionCard = ({ iconClass, title, path }: ActionCardProps) => {
  return (
    <Link href={path}>
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-700 rounded-lg p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-transform cursor-pointer">
        <i className={`${iconClass} text-white text-5xl mb-3`}></i>
        <p className="text-white text-xl font-semibold">{title}</p>
      </div>
    </Link>
  );
};
