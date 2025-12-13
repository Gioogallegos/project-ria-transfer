// hooks/useRates.ts
import { useState, useEffect } from "react";
import { fetchRates, fetchHistory } from "../lib/api";
import { ExchangeRateResponse } from "../types";

export function useRates(base: string) {
  const [data, setData] = useState<ExchangeRateResponse | null>(null);
  const [history, setHistory] = useState<ExchangeRateResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");
      try {
        const todayData = await fetchRates(base);
        setData(todayData);
        
        // Lógica del BONUS: Obtener datos de ayer
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        // Formato YYYY-MM-DD
        const dateStr = yesterday.toISOString().split('T')[0]; 
        const prevData = await fetchHistory(dateStr, base);
        setHistory(prevData);
        
      } catch (err) {
        setError("Error fetching exchange rates. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [base]);

  return { data, history, loading, error };
}