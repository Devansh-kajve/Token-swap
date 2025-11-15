import React, { useState } from "react";
import { ArrowDownUp } from "lucide-react";

// Import constants
import { TOKENS } from "../constants/tokens";
import { CONFIG } from "../constants/config";

// Import hooks
import { useWalletConnection } from "../hooks/useWalletConnection";
import { useSwapCalculator } from "../hooks/useSwapCalculator";
import { useTransactionManager } from "../hooks/useTransactionManager";

// Import components
import { Button } from "../components/ui/Button";
import { Navbar } from "../components/swap/Navbar";
import { SwapPanel } from "../components/swap/SwapPanel";
import { SettingsModal } from "../components/swap/SettingsModal";
import { TransactionModal } from "../components/swap/TransactionModal";
import { RecentTransactions } from "../components/swap/RecentTransactions";

export const SwapPage = () => {
  const wallet = useWalletConnection();
  const swap = useSwapCalculator(TOKENS[0], TOKENS[1]);
  const transaction = useTransactionManager();

  const [showSettings, setShowSettings] = useState(false);
  const [slippage, setSlippage] = useState(CONFIG.DEFAULT_SLIPPAGE);
  const [deadline, setDeadline] = useState(CONFIG.DEFAULT_DEADLINE);

  const handleSwap = () => {
    if (!wallet.isConnected) {
      alert("Please connect your wallet first");
      return;
    }
    transaction.executeSwap(
      swap.fromToken,
      swap.toToken,
      swap.fromAmount,
      swap.toAmount
    );
    setTimeout(() => swap.reset(), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar
        isConnected={wallet.isConnected}
        onConnect={wallet.connect}
        onDisconnect={wallet.disconnect}
        address={wallet.address}
        onSettingsClick={() => setShowSettings(true)}
      />

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Swap Tokens</h1>
          <p className="text-gray-600">Trade tokens in seconds</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <SwapPanel
            title="From"
            selectedToken={swap.fromToken}
            availableTokens={TOKENS}
            onTokenChange={swap.handleFromTokenChange}
            tokenAmount={swap.fromAmount}
            onTokenAmountChange={(value) =>
              swap.handleTokenAmountChange(
                value,
                wallet.getBalance(swap.fromToken.id)
              )
            }
            fiatAmount={swap.fiatAmount}
            onFiatAmountChange={swap.handleFiatAmountChange}
            showFiatInput={true}
            tokenError={swap.errors.fromToken}
            fiatError={swap.errors.fiat}
            balance={wallet.getBalance(swap.fromToken.id)}
            onMaxClick={() => {
              const balance = wallet.getBalance(swap.fromToken.id);
              if (balance) swap.handleTokenAmountChange(balance, balance);
            }}
          />

          <div className="flex justify-center -my-3 relative z-10">
            <button
              onClick={swap.swapTokens}
              className="bg-white border-4 border-gray-100 rounded-xl p-2 hover:bg-gray-50 transition-all hover:rotate-180 duration-300"
            >
              <ArrowDownUp className="text-gray-600" size={20} />
            </button>
          </div>

          <SwapPanel
            title="To"
            selectedToken={swap.toToken}
            availableTokens={TOKENS}
            onTokenChange={swap.handleToTokenChange}
            tokenAmount={swap.toAmount}
            onTokenAmountChange={() => {}}
            showFiatInput={false}
            balance={wallet.getBalance(swap.toToken.id)}
          />

          {swap.fromAmount && swap.toAmount && (
            <div className="mt-4 p-3 bg-blue-50 rounded-xl space-y-2">
              <div className="text-sm text-gray-600 flex justify-between">
                <span>Rate</span>
                <span className="font-semibold">
                  1 {swap.fromToken.symbol} = {swap.exchangeRate.toFixed(6)}{" "}
                  {swap.toToken.symbol}
                </span>
              </div>
              <div className="text-sm text-gray-600 flex justify-between">
                <span>Slippage Tolerance</span>
                <span className="font-semibold">{slippage}%</span>
              </div>
            </div>
          )}

          <Button
            onClick={handleSwap}
            disabled={
              !swap.fromAmount ||
              !swap.toAmount ||
              Object.values(swap.errors).some((e) => e) ||
              !wallet.isConnected
            }
            className="w-full mt-4"
          >
            {!wallet.isConnected
              ? "Connect Wallet"
              : !swap.fromAmount
              ? "Enter an amount"
              : "Swap Tokens"}
          </Button>
        </div>

        <RecentTransactions transactions={transaction.transactions} />

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>⚠️ Demo mode - No real transactions</p>
        </div>
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        slippage={slippage}
        setSlippage={setSlippage}
        deadline={deadline}
        setDeadline={setDeadline}
      />

      <TransactionModal
        isOpen={transaction.isOpen}
        status={transaction.status}
        txHash={transaction.txHash}
        onClose={transaction.closeModal}
        fromToken={swap.fromToken}
        toToken={swap.toToken}
        fromAmount={swap.fromAmount}
        toAmount={swap.toAmount}
      />
    </div>
  );
};
