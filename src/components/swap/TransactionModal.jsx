import React from "react";
import { CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "../ui/Button";

export const TransactionModal = ({
  isOpen,
  status,
  txHash,
  onClose,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        {status === "pending" && (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h3 className="text-xl font-bold mb-2">Transaction Pending</h3>
            <p className="text-gray-600 mb-4">
              Swapping {fromAmount} {fromToken?.symbol} for {toAmount}{" "}
              {toToken?.symbol}
            </p>
            <p className="text-sm text-gray-500">
              Please confirm in your wallet...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-500" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Swap Successful!</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Swapped</span>
                <span className="font-semibold">
                  {fromAmount} {fromToken?.symbol}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Received</span>
                <span className="font-semibold">
                  {toAmount} {toToken?.symbol}
                </span>
              </div>
            </div>
            {txHash && (
              <a
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm mb-4"
              >
                View on Etherscan
                <ExternalLink size={14} />
              </a>
            )}
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
