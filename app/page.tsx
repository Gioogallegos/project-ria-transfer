// app/page.tsx
"use client";
import { useState } from "react";
import { useRates } from "../app/hooks/useRates";
import { CURRENCIES } from "../app/types";
import { ArrowRight, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

export default function Home() {
  const [amount, setAmount] = useState(1);
  const [base, setBase] = useState("EUR");
  const [target, setTarget] = useState("USD");
  const { data, history, loading, error } = useRates(base);

  // Cálculo de conversión
  const result = data?.rates[target] ? (amount * data.rates[target]).toFixed(2) : "---";

  if (error) return <div className="p-10 text-red-500 text-center">{error}</div>;

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Currency Exchange</h1>
          <p className="text-slate-500">Real-time rates & trends</p>
        </header>

        {/* --- CONVERSOR (Requisito 1) --- */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="text-sm font-semibold text-slate-600 mb-1 block">Amount</label>
              <input 
                type="number " 
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex-1 w-full">
               <label className="text-sm font-semibold text-slate-600 mb-1 block">From</label>
               <select 
                 value={base} 
                 onChange={(e) => setBase(e.target.value)}
                 className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200"
               >
                 {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
               </select>
            </div>
            <div className="flex items-center justify-center pb-3 text-slate-400">
              <ArrowRight />
            </div>
            <div className="flex-1 w-full">
               <label className="text-sm font-semibold text-slate-600 mb-1 block">To</label>
               <select 
                 value={target} 
                 onChange={(e) => setTarget(e.target.value)}
                 className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200"
               >
                 {CURRENCIES.filter(c => c !== base).map(c => <option key={c} value={c}>{c}</option>)}
               </select>
            </div>
          </div>
          
          <div className="mt-6 text-right">
             <div className="text-sm text-slate-500">Converted Amount</div>
             <div className="text-4xl font-bold text-blue-600">
               {loading ? "..." : `${result} ${target}`}
             </div>
          </div>
        </section>

        {/* --- LISTA DE TASAS & BONUS (Requisito 2 & Innovation) --- */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-slate-800">Current Rates (Base: {base})</h2>
          {loading ? (
             <div className="flex justify-center p-10"><RefreshCw className="animate-spin text-blue-500"/></div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {CURRENCIES.filter(c => c !== base).map(currency => {
                const currentRate = data?.rates[currency] || 0;
                const pastRate = history?.rates[currency] || 0;
                // Lógica Bonus: Comparar hoy vs ayer
                const isUp = currentRate >= pastRate;

                return (
                  <div key={currency} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-700">{currency}</span>
                      {/* INNOVATION FEATURE VISUALIZATION */}
                      {isUp 
                        ? <TrendingUp size={16} className="text-emerald-500" />
                        : <TrendingDown size={16} className="text-rose-500" />
                      }
                    </div>
                    <div className="text-lg font-mono text-slate-800">{currentRate.toFixed(4)}</div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}