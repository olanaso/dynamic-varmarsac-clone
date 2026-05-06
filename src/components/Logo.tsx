export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-white font-bold text-sm shadow-md">
        CGV
      </div>
      <div className="leading-none">
        <div className="text-2xl font-extrabold text-brand-red tracking-tight">VARMAR</div>
        <div className="mt-1 inline-block rounded-sm bg-brand-blue px-1.5 py-0.5 text-[9px] font-semibold tracking-widest text-white">
          CONTRATISTAS GENERALES
        </div>
      </div>
    </div>
  );
}
