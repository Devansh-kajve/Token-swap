import React, { useState } from "react";
import { Wallet, Settings, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { shortenAddress } from "../../lib/formatters";

export const Navbar = ({
  isConnected,
  onConnect,
  onDisconnect,
  address,
  onSettingsClick,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">SwapDEX</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onSettingsClick}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Settings"
            >
              <Settings size={20} className="text-gray-600" />
            </button>

            {!isConnected ? (
              <Button
                onClick={onConnect}
                className="flex items-center gap-2 py-2"
              >
                <Wallet size={18} />
                <span>Connect Wallet</span>
              </Button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">{shortenAddress(address)}</span>
                  <ChevronDown size={16} />
                </button>

                {showDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowDropdown(false)}
                    />
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
                      <button
                        onClick={() => {
                          onDisconnect();
                          setShowDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-xl text-red-600 font-medium"
                      >
                        Disconnect
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
