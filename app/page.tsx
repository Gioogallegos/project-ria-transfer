"use client";

import { useState } from "react";
import { useRates } from "../app/hooks/useRates";
import { CURRENCIES } from "../app/types";
import { ArrowRightLeft, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { SkeletonCard } from "../app/components/SkeletonCard";

export default function Home() {
  // FIX INPUT: Inicializamos con 1 o cadena vacía para evitar el "0" fijo
  const [amount, setAmount] = useState<number | "">(1);
  const [base, setBase] = useState("EUR");
  const [target, setTarget] = useState("USD");
  
  const { data, history, loading, error } = useRates(base);

  // FIX LÓGICA: Si amount es "", usamos 0 para el cálculo interno
  const validAmount = amount === "" ? 0 : amount;
  
  // Cálculo de conversión
  const result = data?.rates[target] 
    ? (validAmount * data.rates[target]).toFixed(2) 
    : "---";

  // FEATURE SWAP: Función para invertir monedas
  const handleSwap = () => {
    setBase(target);
    setTarget(base);
  };

  // Manejo de errores visual (Requisito UX)
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md border border-red-100">
          <div className="text-red-500 text-xl mb-2 font-bold">Error de conexión</div>
          <p className="text-slate-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-950 tracking-tight">Ria Exchange</h1>
            <p className="text-slate-500">Global currency dashboard</p>
          </div>
          {/* Indicador de última actualización (detalle pro) */}
          {data && (
            <div className="text-xs text-slate-400 bg-white px-3 py-1 rounded-full border">
              Last update: {data.date}
            </div>
          )}
        </header>

        {/* --- CONVERSOR (Requisito 1) --- */}
        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200/60">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
            
            {/* Input Cantidad */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Amount</label>
              <div className="relative">
                <input 
                  type="number" 
                  min="0"
                  // FIX INPUT: Aquí está la magia, si es "" se muestra vacío
                  value={amount} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setAmount(val === "" ? "" : Number(val));
                  }}
                  placeholder="0.00"
                  className="w-full p-4 text-lg bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  {base}
                </span>
              </div>
            </div>

            {/* Selector Monedas + Botón Swap */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
               {/* From */}
               <select 
                 value={base} 
                 onChange={(e) => setBase(e.target.value)}
                 className="w-full p-2 bg-transparent font-semibold text-slate-700 outline-none cursor-pointer text-center appearance-none"
               >
                 {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
               </select>

               {/* FEATURE SWAP BUTTON */}
               <button 
                onClick={handleSwap}
                className="p-2 bg-white rounded-full shadow-sm border hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                title="Swap currencies"
               >
                 <ArrowRightLeft size={18} className="group-hover:rotate-180 transition-transform duration-300" />
               </button>

               {/* To */}
               <select 
                 value={target} 
                 onChange={(e) => setTarget(e.target.value)}
                 className="w-full p-2 bg-transparent font-semibold text-slate-700 outline-none cursor-pointer text-center appearance-none"
               >
                 {CURRENCIES.filter(c => c !== base).map(c => <option key={c} value={c}>{c}</option>)}
               </select>
            </div>

            {/* Resultado */}
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex flex-col justify-center items-end h-[86px]">
               <span className="text-sm text-blue-400 font-medium mb-1">Converted Amount</span>
               <div className="text-3xl font-bold text-blue-700 tracking-tight overflow-hidden text-ellipsis w-full text-right">
                 {loading ? (
                   <span className="animate-pulse opacity-50">...</span>
                 ) : (
                   `${result} ${target}`
                 )}
               </div>
            </div>
          </div>
        </section>

        {/* --- LISTA DE TASAS & BONUS (Requisito 2 & Innovation) --- */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-slate-800">Live Exchange Rates</h2>
            <span className="text-sm bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-xs font-semibold">1 {base} =</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              // FEATURE SKELETON: Mostramos 8 tarjetas cargando
              Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
            ) : (
              CURRENCIES.filter(c => c !== base).map(currency => {
                const currentRate = data?.rates[currency] || 0;
                const pastRate = history?.rates[currency] || 0;
                
                // Lógica Bonus: Comparar hoy vs ayer
                const isUp = currentRate >= pastRate;
                const diff = Math.abs(((currentRate - pastRate) / pastRate) * 100).toFixed(2);

                return (
                  <div key={currency} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {currency}
                        </div>
                      </div>
                      
                      {/* INNOVATION FEATURE: Flecha visual */}
                      <div className="flex items-center gap-1">
                        {isUp 
                          ? <TrendingUp size={16} className="text-emerald-500" />
                          : <TrendingDown size={16} className="text-rose-500" />
                        }
                      </div>
                    </div>
                    
                    <div className="text-2xl font-bold text-slate-700 tabular-nums">
                      {currentRate.toFixed(4)}
                    </div>
                    
                    <div className="text-xs text-slate-400 mt-2 font-medium">
                      <span className={isUp ? "text-emerald-600" : "text-rose-600"}>
                        {isUp ? "+" : "-"}{diff}%
                      </span> vs yesterday
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </section>
      </div>
    </main>
  );
}