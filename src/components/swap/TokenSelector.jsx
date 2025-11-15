import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { MOCK_BALANCES } from "../../constants/tokens";

export const TokenSelector = ({
  selectedToken,
  availableTokens,
  onChange,
  balance,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
      >
        <div className={`w-6 h-6 rounded-full ${selectedToken.color}`}></div>
        <span className="font-semibold">{selectedToken.symbol}</span>
        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {balance && (
        <div className="text-xs text-gray-500 mt-1">Balance: {balance}</div>
      )}

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-lg border border-gray-200 z-20 min-w-[200px]">
            {availableTokens.map((token) => (
              <button
                key={token.id}
                onClick={() => {
                  onChange(token);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${token.color}`}></div>
                  <div className="text-left">
                    <div className="font-semibold">{token.symbol}</div>
                    <div className="text-xs text-gray-500">{token.name}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {MOCK_BALANCES[token.id]}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
