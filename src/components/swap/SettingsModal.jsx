import React from "react";
import { X } from "lucide-react";

export const SettingsModal = ({
  isOpen,
  onClose,
  slippage,
  setSlippage,
  deadline,
  setDeadline,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slippage Tolerance
          </label>
          <div className="flex gap-2 mb-2">
            {[0.1, 0.5, 1.0].map((value) => (
              <button
                key={value}
                onClick={() => setSlippage(value)}
                className={`flex-1 px-3 py-2 rounded-lg font-medium ${
                  slippage === value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {value}%
              </button>
            ))}
          </div>
          <input
            type="number"
            value={slippage}
            onChange={(e) => setSlippage(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Custom"
            step="0.1"
            min="0"
            max="50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction Deadline (minutes)
          </label>
          <input
            type="number"
            value={deadline}
            onChange={(e) => setDeadline(parseInt(e.target.value) || 20)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            min="1"
            max="60"
          />
        </div>
      </div>
    </div>
  );
};
