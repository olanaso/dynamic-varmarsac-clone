const BLOG_POSTS_ENDPOINT = "https://blog.varmarsac.com/wp-json/wp/v2/posts";

type WpRendered = {
  rendered: string;
};

type WpMediaSize = {
  source_url?: string;
};

type WpFeaturedMedia = {
  alt_text?: string;
  source_url?: string;
  media_details?: {
    sizes?: Record<string, WpMediaSize>;
  };
};

type WpTerm = {
  name?: string;
};

export type WpPost = {
  id: number;
  date: string;
  link: string;
  title: WpRendered;
  excerpt: WpRendered;
  _embedded?: {
    "wp:featuredmedia"?: WpFeaturedMedia[];
    "wp:term"?: WpTerm[][];
  };
};

type FetchBlogPostsOptions = {
  page?: number;
  perPage?: number;
};

export async function fetchBlogPosts({ page = 1, perPage = 6 }: FetchBlogPostsOptions = {}) {
  const url = new URL(BLOG_POSTS_ENDPOINT);
  url.searchParams.set("_embed", "1");
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("page", String(page));

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("No se pudieron cargar las publicaciones del blog.");
  }

  const posts = (await response.json()) as WpPost[];
  const total = Number(response.headers.get("X-WP-Total") ?? posts.length);
  const totalPages = Math.max(1, Number(response.headers.get("X-WP-TotalPages") ?? 1));

  return { posts, total, totalPages };
}

export function cleanRenderedText(value = "") {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([a-fA-F0-9]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

export function getFeaturedImageUrl(post: WpPost) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];

  return (
    media?.media_details?.sizes?.large?.source_url ??
    media?.media_details?.sizes?.medium_large?.source_url ??
    media?.source_url
  );
}

export function getFeaturedImageAlt(post: WpPost) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const title = cleanRenderedText(post.title.rendered) || "Articulo VARMAR";

  return cleanRenderedText(media?.alt_text || title);
}

export function getPrimaryCategory(post: WpPost) {
  const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
  return category && category.toLowerCase() !== "uncategorized" ? cleanRenderedText(category) : "Blog";
}

export function getPostDateParts(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return { day: "", month: "Blog" };
  }

  return {
    day: new Intl.DateTimeFormat("es-PE", { day: "2-digit" }).format(parsed),
    month: new Intl.DateTimeFormat("es-PE", { month: "short" }).format(parsed).replace(".", ""),
  };
}

export function formatPostDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Fecha no disponible";
  }

  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsed);
}
