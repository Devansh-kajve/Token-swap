import { useState, useCallback } from "react";
import {
  tokenToFiat,
  fiatToToken,
  calculateSwapOutput,
  getExchangeRate,
} from "../lib/calculator";
import { validateAmount } from "../lib/validation";

export const useSwapCalculator = (initialFromToken, initialToToken) => {
  const [fromToken, setFromToken] = useState(initialFromToken);
  const [toToken, setToToken] = useState(initialToToken);
  const [fromAmount, setFromAmount] = useState("");
  const [fiatAmount, setFiatAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [errors, setErrors] = useState({});

  const handleTokenAmountChange = useCallback(
    (value, balance) => {
      const error = validateAmount(value, balance);
      setFromAmount(value);
      setErrors((prev) => ({ ...prev, fromToken: error }));

      if (!value || error) {
        setFiatAmount("");
        setToAmount("");
        return;
      }

      setFiatAmount(tokenToFiat(value, fromToken.priceUsd));
      setToAmount(
        calculateSwapOutput(value, fromToken.priceUsd, toToken.priceUsd)
      );
    },
    [fromToken, toToken]
  );

  const handleFiatAmountChange = useCallback(
    (value) => {
      const error = validateAmount(value);
      setFiatAmount(value);
      setErrors((prev) => ({ ...prev, fiat: error }));

      if (!value || error) {
        setFromAmount("");
        setToAmount("");
        return;
      }

      const newToken = fiatToToken(value, fromToken.priceUsd);
      setFromAmount(newToken);
      setToAmount(
        calculateSwapOutput(newToken, fromToken.priceUsd, toToken.priceUsd)
      );
    },
    [fromToken, toToken]
  );

  const handleFromTokenChange = useCallback(
    (token) => {
      if (token.id === toToken.id) setToToken(fromToken);
      setFromToken(token);

      if (fromAmount) {
        setFiatAmount(tokenToFiat(fromAmount, token.priceUsd));
        setToAmount(
          calculateSwapOutput(fromAmount, token.priceUsd, toToken.priceUsd)
        );
      }
    },
    [fromToken, toToken, fromAmount]
  );

  const handleToTokenChange = useCallback(
    (token) => {
      if (token.id === fromToken.id) setFromToken(toToken);
      setToToken(token);

      if (fromAmount) {
        setToAmount(
          calculateSwapOutput(fromAmount, fromToken.priceUsd, token.priceUsd)
        );
      }
    },
    [fromToken, toToken, fromAmount]
  );

  const swapTokens = useCallback(() => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    if (toAmount) setFiatAmount(tokenToFiat(toAmount, toToken.priceUsd));
  }, [fromToken, toToken, fromAmount, toAmount]);

  const reset = useCallback(() => {
    setFromAmount("");
    setFiatAmount("");
    setToAmount("");
    setErrors({});
  }, []);

  return {
    fromToken,
    toToken,
    fromAmount,
    fiatAmount,
    toAmount,
    errors,
    handleTokenAmountChange,
    handleFiatAmountChange,
    handleFromTokenChange,
    handleToTokenChange,
    swapTokens,
    reset,
    exchangeRate: getExchangeRate(fromToken.priceUsd, toToken.priceUsd),
  };
};
