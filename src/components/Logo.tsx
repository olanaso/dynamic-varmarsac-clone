import logo from "@/assets/logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="VARMAR Contratistas Generales"
      className={`h-12 w-auto md:h-14 ${className}`}
    />
  );
}
