import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos y Condiciones — VARMAR Contratistas Generales" },
      { name: "description", content: "Términos y condiciones de uso del sitio web de VARMAR Contratistas Generales." },
    ],
  }),
  component: TerminosPage,
});

function TerminosPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-20">
        <div className="mb-8">
          <Link to="/" className="text-sm text-brand-blue hover:underline">
            ← Volver al inicio
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold text-brand-blue-dark md:text-4xl">
          Términos y Condiciones
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Última actualización: {new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-foreground/80">
          <section>
            <h2 className="text-lg font-bold text-brand-blue-dark">1. Aceptación de los términos</h2>
            <p className="mt-3">
              Al acceder y utilizar el sitio web de <strong>VARMAR Contratistas Generales S.A.C.</strong> (en adelante, "VARMAR"), usted acepta cumplir con estos Términos y Condiciones de Uso. Si no está de acuerdo con alguna parte de estos términos, le solicitamos que no utilice nuestro sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-blue-dark">2. Uso del sitio web</h2>
            <p className="mt-3">
              Este sitio web tiene como finalidad proporcionar información sobre nuestros servicios de obras civiles, servicios generales, alquiler de vehículos y proyectos integrales. El contenido presentado es solo para fines informativos y no constituye una oferta contractual vinculante.
            </p>
            <p className="mt-3">
              Queda prohibido el uso de este sitio para fines ilegales, no autorizados o que puedan dañar la reputación de VARMAR. No está permitido intentar acceder a áreas restringidas del sitio, interferir con su funcionamiento o introducir malware.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-blue-dark">3. Propiedad intelectual</h2>
            <p className="mt-3">
              Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos, videos, diseños y software, es propiedad exclusiva de VARMAR o de sus licenciantes y está protegido por las leyes peruanas de propiedad intelectual e internacionales.
            </p>
            <p className="mt-3">
              No se permite la reproducción, distribución, modificación o explotación del contenido sin autorización previa y expresa por escrito de VARMAR.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-blue-dark">4. Información de contacto y cotizaciones</h2>
            <p className="mt-3">
              Los formularios de contacto y cotización disponibles en este sitio tienen el propósito de recopilar información necesaria para atender sus consultas. Al enviar un formulario, usted garantiza que la información proporcionada es veraz y actual.
            </p>
            <p className="mt-3">
              Las cotizaciones enviadas por VARMAR son preliminares y pueden estar sujetas a cambios según las especificaciones técnicas definitivas del proyecto. Una cotización no constituye un contrato hasta que sea aceptada formalmente por ambas partes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-blue-dark">5. Limitación de responsabilidad</h2>
            <p className="mt-3">
              VARMAR no garantiza que el sitio web esté libre de errores, virus o interrupciones. No nos hacemos responsables por daños directos, indirectos, incidentales o consecuenciales derivados del uso o la imposibilidad de uso de este sitio.
            </p>
            <p className="mt-3">
              La información contenida en este sitio puede contener inexactitudes tipográficas o errores técnicos. VARMAR se reserva el derecho de corregir cualquier error y actualizar la información en cualquier momento sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-blue-dark">6. Enlaces a terceros</h2>
            <p className="mt-3">
              Este sitio puede contener enlaces a sitios web de terceros. VARMAR no tiene control sobre el contenido, las políticas de privacidad o las prácticas de estos sitios externos y no asume responsabilidad alguna por ellos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-blue-dark">7. Privacidad y protección de datos</h2>
            <p className="mt-3">
              El tratamiento de los datos personales proporcionados a través de este sitio se realiza de conformidad con la Ley N° 29733 — Ley de Protección de Datos Personales y su reglamento. Para más información, consulte nuestra Política de Privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-blue-dark">8. Modificaciones</h2>
            <p className="mt-3">
              VARMAR se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigencia desde su publicación en esta página. Se recomienda revisar periódicamente esta sección.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-blue-dark">9. Ley aplicable y jurisdicción</h2>
            <p className="mt-3">
              Estos Términos y Condiciones se rigen por las leyes de la República del Perú. Cualquier controversia derivada del uso de este sitio será sometida a la jurisdicción de los jueces y tribunales de la ciudad de Cusco, Perú.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-blue-dark">10. Contacto</h2>
            <p className="mt-3">
              Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos a:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li><strong>Email:</strong> info@varmarsac.com</li>
              <li><strong>Teléfono:</strong> 084-284833 / 950-396818</li>
              <li><strong>Dirección:</strong> Cusco - Villa Unión Huancaro C-8</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
