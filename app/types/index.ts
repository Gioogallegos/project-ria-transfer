// types/index.ts
export interface ExchangeRateResponse {
  amount: number;
  base: string;
  date: string;
  rates: { [key: string]: number };
}

// Las 10 monedas principales requeridas 
export const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD"];