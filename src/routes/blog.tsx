import { createFileRoute } from "@tanstack/react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, FileText, RefreshCw } from "lucide-react";
import hero from "@/assets/hero-construction.jpg";
import fallbackImage from "@/assets/truck.jpg";
import {
  cleanRenderedText,
  fetchBlogPosts,
  formatPostDate,
  getFeaturedImageAlt,
  getFeaturedImageUrl,
  getPostDateParts,
  getPrimaryCategory,
} from "@/lib/blog";

const POSTS_PER_PAGE = 9;

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog - VARMAR Contratistas Generales" },
      { name: "description", content: "Noticias, novedades y perspectivas de VARMAR Contratistas Generales." },
    ],
  }),
  component: BlogPage,
});

function getPaginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
  const validPages = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  return validPages.reduce<(number | string)[]>((items, page, index) => {
    const previous = validPages[index - 1];

    if (previous && page - previous > 1) {
      items.push(`ellipsis-${previous}-${page}`);
    }

    items.push(page);
    return items;
  }, []);
}

function BlogPage() {
  const [page, setPage] = useState(1);
  const didMount = useRef(false);

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["blog-posts", page],
    queryFn: () => fetchBlogPosts({ page, perPage: POSTS_PER_PAGE }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  const posts = data?.posts ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const paginationItems = useMemo(() => getPaginationItems(page, totalPages), [page, totalPages]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    const listing = document.getElementById("blog-listado");
    listing?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  const goToPage = (nextPage: number) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-brand-blue-dark py-20 text-white md:py-24">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `url(${hero})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-brand-blue-dark/90 to-brand-blue/70" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-sky-400">
            <FileText className="h-4 w-4" />
            VARMAR Blog
          </span>
          <h1 className="mt-4 text-4xl font-extrabold uppercase tracking-tight text-white md:text-6xl">Noticias</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Novedades, anuncios y perspectivas para seguir de cerca el trabajo de VARMAR en transporte, operaciones y servicios integrales.
          </p>
        </div>
      </section>

      <section id="blog-listado" className="bg-brand-soft py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-brand-blue">Actualidad</span>
              <h2 className="mt-3 text-3xl font-extrabold text-brand-blue-dark md:text-5xl">Últimas noticias</h2>
              <p className="mt-3 text-sm font-medium text-foreground/70">
                Mostrando {posts.length} de {total} publicaciones.
              </p>
            </div>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex w-fit items-center gap-2 rounded-sm border border-brand-blue/20 bg-white px-5 py-3 text-sm font-bold uppercase tracking-wider text-brand-blue-dark shadow-sm transition hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw className={"h-4 w-4 " + (isFetching ? "animate-spin" : "")} />
              Actualizar
            </button>
          </div>

          {isLoading ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
                <div key={index} className="overflow-hidden rounded-sm bg-white shadow-[var(--shadow-card)]">
                  <div className="aspect-[4/3] animate-pulse bg-slate-200" />
                  <div className="space-y-4 p-6">
                    <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                    <div className="h-6 w-5/6 animate-pulse rounded bg-slate-200" />
                    <div className="h-16 w-full animate-pulse rounded bg-slate-200" />
                    <div className="h-10 w-28 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="mt-10 rounded-sm border border-brand-red/20 bg-white p-8 text-center shadow-[var(--shadow-card)]">
              <h3 className="text-xl font-extrabold text-brand-blue-dark">No pudimos cargar las noticias</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm text-foreground/70">Intenta nuevamente en unos segundos.</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-6 inline-flex items-center gap-2 rounded-sm bg-brand-red px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
              >
                Reintentar <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          ) : posts.length > 0 ? (
            <>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => {
                  const title = cleanRenderedText(post.title.rendered) || "Artículo VARMAR";
                  const excerpt = cleanRenderedText(post.excerpt.rendered);
                  const date = getPostDateParts(post.date);

                  return (
                    <article
                      key={post.id}
                      className="group overflow-hidden rounded-sm bg-white shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <a href={post.link} target="_blank" rel="noreferrer" className="block">
                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                          <img
                            src={getFeaturedImageUrl(post) ?? fallbackImage}
                            alt={getFeaturedImageAlt(post)}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                          <div className="absolute left-5 top-5 rounded-sm bg-white/95 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-blue-dark shadow-sm">
                            {getPrimaryCategory(post)}
                          </div>
                          <div className="absolute bottom-0 left-5 grid min-h-16 min-w-16 place-items-center bg-brand-red px-3 py-2 text-center text-white shadow-lg">
                            <span className="text-xs font-bold uppercase leading-none">{date.month}</span>
                            <span className="mt-1 text-2xl font-extrabold leading-none">{date.day}</span>
                          </div>
                        </div>
                      </a>

                      <div className="flex min-h-[260px] flex-col p-6">
                        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          <CalendarDays className="h-4 w-4 text-brand-blue" />
                          <span>{formatPostDate(post.date)}</span>
                        </div>
                        <h3 className="text-lg font-extrabold uppercase leading-snug text-brand-blue-dark">
                          <a href={post.link} target="_blank" rel="noreferrer" className="transition hover:text-brand-blue">
                            {title}
                          </a>
                        </h3>
                        {excerpt ? <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/70">{excerpt}</p> : null}
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-auto inline-flex w-fit items-center gap-2 rounded-sm bg-brand-blue-dark px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-blue"
                        >
                          Leer más <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1 || isFetching}
                  aria-label="Página anterior"
                  className="grid h-11 w-11 place-items-center rounded-sm border border-border bg-white text-brand-blue-dark transition hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {paginationItems.map((item) =>
                  typeof item === "number" ? (
                    <button
                      key={item}
                      type="button"
                      onClick={() => goToPage(item)}
                      disabled={isFetching}
                      className={
                        "h-11 min-w-11 rounded-sm px-4 text-sm font-extrabold transition disabled:cursor-not-allowed disabled:opacity-60 " +
                        (item === page ? "bg-brand-red text-white shadow-md" : "border border-border bg-white text-brand-blue-dark hover:border-brand-blue hover:text-brand-blue")
                      }
                    >
                      {item}
                    </button>
                  ) : (
                    <span key={item} className="grid h-11 min-w-8 place-items-center text-sm font-bold text-muted-foreground">
                      ...
                    </span>
                  ),
                )}

                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages || isFetching}
                  aria-label="Página siguiente"
                  className="grid h-11 w-11 place-items-center rounded-sm border border-border bg-white text-brand-blue-dark transition hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="mt-10 rounded-sm border border-border bg-white p-8 text-center shadow-[var(--shadow-card)]">
              <h3 className="text-xl font-extrabold text-brand-blue-dark">Aún no hay noticias disponibles</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm text-foreground/70">Cuando se publiquen nuevas entradas en WordPress aparecerán aquí automáticamente.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
