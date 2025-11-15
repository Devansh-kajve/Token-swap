import React from "react";
import { CheckCircle, ExternalLink } from "lucide-react";

export const RecentTransactions = ({ transactions }) => {
  if (transactions.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Recent Transactions
      </h3>
      <div className="space-y-2">
        {transactions.slice(0, 3).map((tx, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-3 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-green-500" size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">
                    Swapped {tx.fromAmount} {tx.fromToken} → {tx.toAmount}{" "}
                    {tx.toToken}
                  </div>
                  <div className="text-xs text-gray-500">{tx.timestamp}</div>
                </div>
              </div>
              <a
                href={`https://etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
