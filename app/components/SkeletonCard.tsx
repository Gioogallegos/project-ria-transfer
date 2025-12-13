// components/SkeletonCard.tsx
export function SkeletonCard() {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm animate-pulse h-[100px] flex flex-col justify-center space-y-3">
      {/* Simula el título (Moneda + Flecha) */}
      <div className="flex justify-between items-center">
        <div className="h-5 w-12 bg-slate-200 rounded"></div>
        <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
      </div>
      {/* Simula el valor numérico */}
      <div className="h-8 w-32 bg-slate-200 rounded"></div>
    </div>
  );
}