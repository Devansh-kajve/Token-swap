import { useState, useCallback } from "react";
import { CONFIG } from "../constants/config";
import { generateTxHash } from "../lib/formatters";

export const useTransactionManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("pending");
  const [txHash, setTxHash] = useState("");
  const [transactions, setTransactions] = useState([]);

  const executeSwap = useCallback(
    (fromToken, toToken, fromAmount, toAmount) => {
      setStatus("pending");
      setIsOpen(true);

      setTimeout(() => {
        const hash = generateTxHash();
        setTxHash(hash);
        setStatus("success");

        const newTx = {
          fromToken: fromToken.symbol,
          toToken: toToken.symbol,
          fromAmount,
          toAmount,
          hash,
          timestamp: new Date().toLocaleTimeString(),
        };
        setTransactions((prev) => [newTx, ...prev]);
      }, CONFIG.TRANSACTION_DELAY);
    },
    []
  );

  const closeModal = useCallback(() => setIsOpen(false), []);

  return { isOpen, status, txHash, transactions, executeSwap, closeModal };
};
