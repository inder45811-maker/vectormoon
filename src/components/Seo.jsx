/**
 * React 19 native head hoisting — no react-helmet-async needed.
 * Title/meta/link/script render into the component tree and React hoists them to <head>.
 */
export default function Seo({
  title,
  description,
  url,
  type = 'website',
  image,
  jsonLd,
  geoRegion = 'GB-COV',
  geoPlacename = 'Coventry',
}) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="geo.region" content={geoRegion} />
      <meta name="geo.placename" content={geoPlacename} />
      <meta name="author" content="VectorMoon" />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="VectorMoon" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image ? <meta property="og:image" content={image} /> : null}
      {image ? <meta property="og:image:alt" content={title} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={image} /> : null}
      {image ? <meta name="twitter:image:alt" content={title} /> : null}

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </>
  )
}
