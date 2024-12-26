import React from "react";

interface BalanceBoxProps {
  balance: number;
  totalInvoices: string;
}

export const BalanceBox = ({ totalInvoices }: BalanceBoxProps) => {
  return (
    <div className="bg-white md:p-2 p-1 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md lg:w-[35%]">
      <div className="flex justify-center items-center space-x-5 h-full">
        <div>
          <p>Total de Facturas</p>

          <p className="flex items-center justify-center">{totalInvoices}</p>
        </div>
      </div>
    </div>
  );
};
