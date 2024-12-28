"use client";

import { useRouter } from "next/navigation";
import { LoginHomeButton } from "../components/buttons/LoginHomeButton";

export default function HomePage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login"); // Redirige a la página de login
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-2 min-h-screen min-w-screen">
      <h1 className="text-black">Bienvenido al Sistema de Facturación</h1>
      <LoginHomeButton handleLoginClick={handleLoginClick} />
    </div>
  );
}
