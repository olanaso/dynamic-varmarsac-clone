import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Mail, Phone, Facebook, Linkedin, Instagram, Youtube, Twitter } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

const socials = [
  { Icon: Facebook, href: "#" },
  { Icon: Linkedin, href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Youtube, href: "#" },
  { Icon: Twitter, href: "#" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const nav: { to: "/" | "/nosotros" | "/servicios" | "/flota" | "/proyectos" | "/contacto"; label: string }[] = [
    { to: "/", label: t("nav.inicio") },
    { to: "/nosotros", label: t("nav.nosotros") },
    { to: "/servicios", label: t("nav.servicios") },
    { to: "/flota", label: t("nav.flota") },
    { to: "/proyectos", label: t("nav.proyectos") },
    { to: "/contacto", label: t("nav.contacto") },
  ];
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top utility bar */}
      <div className="border-b border-border/60 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-3 md:flex-row md:px-8">
          <Link to="/"><Logo /></Link>

          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground/80">
              <a href="mailto:info@varmarsac.com" className="flex items-center gap-2 hover:text-brand-red">
                <Mail className="h-4 w-4 text-brand-red" />
                info@varmarsac.com
              </a>
              <a href="tel:+51950396818" className="flex items-center gap-2 hover:text-brand-red">
                <Phone className="h-4 w-4 text-brand-red" />
                950-396818 / 084-284833
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {socials.map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="grid h-7 w-7 place-items-center rounded-full bg-foreground text-white transition hover:bg-brand-red"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
              <LanguageSwitcher />
              <Link
                to="/contacto"
                className="rounded-sm bg-brand-red px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:brightness-110"
              >
                {t("nav.cotizar")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="border-b border-border/60 bg-[#f3f3f3]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
          <nav className="hidden flex-1 items-stretch justify-center lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative px-7 py-4 text-xs font-bold uppercase tracking-wider text-foreground/75 transition-colors hover:text-sky-500"
                activeProps={{ className: "bg-sky-500 text-white hover:text-white" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button onClick={() => setOpen(!open)} className="ml-auto rounded-sm p-3 lg:hidden" aria-label="Menú">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <nav className="flex flex-col bg-white lg:hidden">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-t border-border px-5 py-3 text-xs font-bold uppercase tracking-wider text-foreground/80"
                activeProps={{ className: "bg-sky-500 text-white" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
