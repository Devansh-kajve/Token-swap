import { CONFIG } from "../constants/config";

export const validateAmount = (value, maxBalance) => {
  if (!value) return null;
  const num = parseFloat(value);
  if (isNaN(num)) return "Invalid number";
  if (num <= 0) return "Must be greater than 0";
  if (num > CONFIG.MAX_AMOUNT) return "Amount too large";
  if (maxBalance && num > parseFloat(maxBalance)) return "Insufficient balance";
  return null;
};
