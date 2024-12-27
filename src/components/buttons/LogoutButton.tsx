"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IoLogOutOutline } from "react-icons/io5";

interface LogoutButtonProps {
  onLogout?: () => void; // Callback opcional para lógica adicional en el logout
}
export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  const router = useRouter();

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // Ejecuta lógica adicional si se proporciona
    }

    // Redirigir al login
    router.push("/login");
  };

  return (
    <button
      className="w-full px-2 inline-flex space-x-2 items-center  py-3 ease-linear duration-150  transition"
      onClick={handleLogout}
    >
      <IoLogOutOutline size={24} className="text-red-500 hover:bg-red-600" />
      <span className="ml-3 text-white font-bold ">Logout</span>
    </button>
  );
};
