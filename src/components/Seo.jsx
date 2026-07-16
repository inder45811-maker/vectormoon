import { Helmet } from 'react-helmet-async'

export default function Seo({ title, description, url, type = 'website', image, jsonLd }) {
  return (
    <Helmet>
      <html lang="en-GB" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="geo.region" content="GB-COV" />
      <meta name="geo.placename" content="Coventry" />
      <meta name="author" content="VectorMoon" />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="VectorMoon" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
