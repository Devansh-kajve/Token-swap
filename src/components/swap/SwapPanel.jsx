import React from "react";
import { TokenSelector } from "./TokenSelector";
import { Input } from "../ui/Input";
import { formatUsd } from "../../lib/formatters";

export const SwapPanel = ({
  title,
  selectedToken,
  availableTokens,
  onTokenChange,
  tokenAmount,
  onTokenAmountChange,
  fiatAmount,
  onFiatAmountChange,
  showFiatInput,
  tokenError,
  fiatError,
  balance,
  onMaxClick,
}) => (
  <div className="bg-gray-50 rounded-2xl p-4">
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-medium text-gray-600">{title}</span>
      <TokenSelector
        selectedToken={selectedToken}
        availableTokens={availableTokens}
        onChange={onTokenChange}
        balance={balance}
      />
    </div>

    <div className="flex gap-4">
      <Input
        label="Amount"
        value={tokenAmount}
        onChange={onTokenAmountChange}
        placeholder="0.0"
        readOnly={!showFiatInput && title === "To"}
        error={tokenError}
        showMaxButton={showFiatInput}
        onMaxClick={onMaxClick}
      />

      {showFiatInput && (
        <Input
          label="USD Value"
          value={fiatAmount}
          onChange={onFiatAmountChange}
          placeholder="$0.00"
          error={fiatError}
        />
      )}
    </div>

    <div className="mt-2 text-xs text-gray-500">
      1 {selectedToken.symbol} = {formatUsd(selectedToken.priceUsd)}
    </div>
  </div>
);
