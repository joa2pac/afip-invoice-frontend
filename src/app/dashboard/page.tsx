import { BalanceBox } from "@/components/balance-box/BalanceBox";
import { ActionCard } from "@/components/cards/ActionCard";
import { SearchBar } from "@/components/searchbar/Searchbar";

import React from "react";

export default function MainPage() {
  return (
    <div className="bg-slate-100 min-h-screen p-6">
      <SearchBar />
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Caja de Balance */}
        <BalanceBox balance={50365} totalInvoices="25.365" />

        {/* Contenedor de Acciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          <ActionCard
            iconClass="fas fa-exchange-alt"
            title="Emitir Factura"
            path="/dashboard/invoice"
          />
          <ActionCard
            iconClass="fas fa-exchange-alt"
            title="Facturas"
            path="/dashboard/facturas"
          />
          <ActionCard
            iconClass="fas fa-exchange-alt"
            title="Otro"
            path="/dashboard/redeem"
          />
        </div>
      </div>
    </div>
  );
}
