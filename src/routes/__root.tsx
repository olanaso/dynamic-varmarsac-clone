import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { I18nextProvider } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { openWhatsApp, whatsappContactMessage } from "@/lib/whatsapp";
import appCss from "../styles.css?url";
import i18n from "@/i18n/config";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-brand-blue">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">La página que buscas no existe.</p>
        <Link to="/" className="mt-6 inline-flex rounded-sm bg-brand-blue px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">Ir al inicio</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Algo salió mal</h1>
        <p className="mt-2 text-sm text-muted-foreground">Intenta nuevamente o vuelve al inicio.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-sm bg-brand-blue px-4 py-2 text-sm font-medium text-white">Reintentar</button>
          <a href="/" className="rounded-sm border px-4 py-2 text-sm font-medium">Inicio</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VARMAR Contratistas Generales — Construcción & Servicios" },
      { name: "description", content: "VARMAR: obras civiles, mantenimiento industrial y proyectos integrales con calidad, seguridad y confianza." },
      { property: "og:title", content: "VARMAR Contratistas Generales — Construcción & Servicios" },
      { name: "twitter:title", content: "VARMAR Contratistas Generales — Construcción & Servicios" },
      { property: "og:description", content: "VARMAR: obras civiles, mantenimiento industrial y proyectos integrales con calidad, seguridad y confianza." },
      { name: "twitter:description", content: "VARMAR: obras civiles, mantenimiento industrial y proyectos integrales con calidad, seguridad y confianza." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2b2d491a-46f1-41c5-bc26-3a0be1e58fd6/id-preview-ab913219--a4c4b603-332d-4d19-83bc-8d86a5e5a9ac.lovable.app-1778196240418.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2b2d491a-46f1-41c5-bc26-3a0be1e58fd6/id-preview-ab913219--a4c4b603-332d-4d19-83bc-8d86a5e5a9ac.lovable.app-1778196240418.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function WhatsAppFloat() {
  return (
    <button
      type="button"
      onClick={() => openWhatsApp(whatsappContactMessage)}
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </button>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1"><Outlet /></main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </QueryClientProvider>
  );
}
