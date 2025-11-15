import { useState, useCallback } from "react";
import { MOCK_BALANCES } from "../constants/tokens";

export const useWalletConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address] = useState("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8");

  const connect = useCallback(() => setIsConnected(true), []);
  const disconnect = useCallback(() => setIsConnected(false), []);
  const getBalance = useCallback(
    (tokenId) => (isConnected ? MOCK_BALANCES[tokenId] : null),
    [isConnected]
  );

  return { isConnected, address, connect, disconnect, getBalance };
};
