import { Helmet } from "react-helmet-async";

const SITE_NAME = "Nour Youssef";
const DEFAULT_URL = "https://www.nouryoussef.design";
const DEFAULT_IMAGE = `${DEFAULT_URL}/og-cover.jpg`;
const TWITTER_HANDLE = "@nouryoussef";

/**
 * Drop this at the top of any page/route and pass page-specific values.
 * Every prop has a sensible fallback, so a minimal page only needs `title`.
 *
 * Usage:
 *   <SEO
 *     title="Selected work"
 *     description="Brand identity, editorial, and product design by Nour Youssef."
 *     path="/work"
 *   />
 */
export default function SEO({
  title,
  description = "Nour Youssef is a visual designer working across brand identity, editorial, and digital product — bold ink, clean grids, black and white.",
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  keywords,
  jsonLd,
}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Visual Designer`;
  const url = `${DEFAULT_URL}${path === "/" ? "" : path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
