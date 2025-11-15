export const formatUsd = (value) => {
  if (!value || isNaN(value)) return "$0.00";
  return `$${Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const shortenAddress = (address) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const generateTxHash = () =>
  "0x" +
  Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
