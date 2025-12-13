// types/index.ts
export interface ExchangeRateResponse {
  amount: number;
  base: string;
  date: string;
  rates: { [key: string]: number };
}

// Monedas principales requeridas 
export const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD", "MXN", "BRL"];