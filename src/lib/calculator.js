export const tokenToFiat = (tokenAmount, priceUsd) => {
  if (!tokenAmount || isNaN(Number(tokenAmount))) return "";
  return (Number(tokenAmount) * priceUsd).toFixed(2);
};

export const fiatToToken = (fiatAmount, priceUsd) => {
  if (!fiatAmount || isNaN(Number(fiatAmount)) || priceUsd === 0) return "";
  return (Number(fiatAmount) / priceUsd).toFixed(6);
};

export const calculateSwapOutput = (fromAmount, fromPriceUsd, toPriceUsd) => {
  if (!fromAmount || isNaN(Number(fromAmount))) return "";
  const usdValue = Number(fromAmount) * fromPriceUsd;
  return (usdValue / toPriceUsd).toFixed(6);
};

export const getExchangeRate = (fromPriceUsd, toPriceUsd) =>
  fromPriceUsd / toPriceUsd;
