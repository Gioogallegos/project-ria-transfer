// lib/api.ts
import { ExchangeRateResponse } from "../types";

const BASE_URL = "https://api.frankfurter.app";

export const fetchRates = async (base: string): Promise<ExchangeRateResponse> => {
  const res = await fetch(`${BASE_URL}/latest?from=${base}`);
  if (!res.ok) throw new Error("Failed to fetch rates");
  return res.json();
};

export const fetchHistory = async (date: string, base: string): Promise<ExchangeRateResponse> => {
  const res = await fetch(`${BASE_URL}/${date}?from=${base}`);
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
};