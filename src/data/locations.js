function townFaqs(town, county) {
  return [
    {
      q: `How much does web design cost in ${town}?`,
      a: `VectorMoon packages start at £799 for a single-page launch site, £1,499 for a multi-page business website, and from £2,999 for e-commerce. Local brochure competitors often price £699–£999; we sit just above that with higher-end custom design and multi-page SEO structure.`,
    },
    {
      q: `Do you only work with ${town} businesses?`,
      a: `We're based in Coventry and serve ${county} and West Midlands local businesses, but we work UK-wide. Local SEO and Google Business guidance are strongest when you serve a clear service area.`,
    },
    {
      q: 'Why multi-page instead of one long scroll?',
      a: `Separate pages give each search intent its own title, meta description, URL, and schema — critical for Google rankings and for AI tools that answer “web designer ${town}” or “website cost UK”.`,
    },
    {
      q: 'How long until my site launches?',
      a: 'Most Starter and Business projects launch in about one to two weeks once content and feedback are ready.',
    },
  ]
}

export const locations = [
  {
    slug: 'coventry',
    town: 'Coventry',
    county: 'West Midlands',
    title: 'Web Design Coventry | Local Website Designer — VectorMoon',
    description:
      'Looking for web design in Coventry? VectorMoon builds modern, SEO & GEO-ready websites for local businesses. Packages from £799. Free 15-minute strategy call.',
    eyebrow: 'Web design Coventry',
    heroTitle: 'Your local website studio',
    highlight: 'in Coventry.',
    subtitle:
      'Modern multi-page sites for Coventry and West Midlands businesses — built to rank, convert, and look expensive.',
    intro: [
      'A strong website is the shopfront customers check before they call. VectorMoon is a Coventry-based studio building custom sites for service businesses — detailing, retail, studios, trades — with clear pricing, real portfolio proof, and technical SEO that goes beyond a single scrolling page.',
      'Local competitors often sell WordPress brochure packages from around £699–£999. We compete on value with modern design, multi-page architecture for SEO and GEO (AI search), and packages from £799 that still leave room for craft — not template lock-in.',
    ],
    faqs: townFaqs('Coventry', 'West Midlands'),
  },
  {
    slug: 'bedworth',
    town: 'Bedworth',
    county: 'Warwickshire',
    title: 'Web Design Bedworth | Local Website Designer — VectorMoon',
    description:
      'Web design in Bedworth, Warwickshire. VectorMoon builds modern, fast, SEO-ready websites for local businesses. Packages from £799. Free strategy call.',
    eyebrow: 'Web design Bedworth',
    heroTitle: 'Your local website studio',
    highlight: 'in Bedworth.',
    subtitle:
      'Modern multi-page sites for Bedworth and Warwickshire businesses — built to rank, convert, and look expensive.',
    intro: [
      'Bedworth sits minutes from Coventry and Nuneaton, and its local trades, salons, and independent shops live or die on word of mouth. A sharp, fast website turns that local trust into booked work — and shows up when people search "web design Bedworth".',
      'VectorMoon builds custom multi-page sites for Bedworth businesses with clear pricing from £799, real portfolio proof, and technical SEO that goes beyond a single scrolling page. No template lock-in, no agency bloat.',
    ],
    faqs: townFaqs('Bedworth', 'Warwickshire'),
  },
  {
    slug: 'nuneaton',
    town: 'Nuneaton',
    county: 'Warwickshire',
    title: 'Web Design Nuneaton | Local Website Designer — VectorMoon',
    description:
      'Web design in Nuneaton, Warwickshire. VectorMoon builds modern, mobile-first, SEO-ready websites for local businesses. Packages from £799. Free strategy call.',
    eyebrow: 'Web design Nuneaton',
    heroTitle: 'Your local website studio',
    highlight: 'in Nuneaton.',
    subtitle:
      'Modern multi-page sites for Nuneaton and Warwickshire businesses — built to rank, convert, and look expensive.',
    intro: [
      "Nuneaton is Warwickshire's largest town, but plenty of its independent businesses are still invisible online — a Facebook page or a dated DIY site quietly costing them enquiries. A proper website is the difference between a phone that rings and a customer who picks the competitor.",
      'VectorMoon builds modern, mobile-first, multi-page sites for Nuneaton businesses that rank on Google, load fast, and actually convert — with clear pricing from £799 and real portfolio proof.',
    ],
    faqs: townFaqs('Nuneaton', 'Warwickshire'),
  },
  {
    slug: 'warwick',
    town: 'Warwick',
    county: 'Warwickshire',
    title: 'Web Design Warwick | Local Website Designer — VectorMoon',
    description:
      'Web design in Warwick, Warwickshire. VectorMoon builds high-end, fast, SEO-ready websites for local businesses. Packages from £799. Free strategy call.',
    eyebrow: 'Web design Warwick',
    heroTitle: 'Your local website studio',
    highlight: 'in Warwick.',
    subtitle:
      'Modern multi-page sites for Warwick and Warwickshire businesses — built to rank, convert, and look expensive.',
    intro: [
      "Warwick's mix of independent retailers, professionals, and trades means a website has to work hard — it's the first impression for customers who expect polish. A dated site quietly erodes that trust before you ever get the chance to quote.",
      'VectorMoon builds high-end, fast, SEO-ready sites for Warwick and Warwickshire businesses — with clear pricing from £799, multi-page architecture for Google and AI search, and real portfolio proof.',
    ],
    faqs: townFaqs('Warwick', 'Warwickshire'),
  },
  {
    slug: 'leamington-spa',
    town: 'Leamington Spa',
    county: 'Warwickshire',
    title: 'Web Design Leamington Spa | Local Website Designer — VectorMoon',
    description:
      'Web design in Royal Leamington Spa, Warwickshire. VectorMoon builds premium, fast, SEO-ready websites for local businesses. Packages from £799. Free strategy call.',
    eyebrow: 'Web design Leamington Spa',
    heroTitle: 'Your local website studio',
    highlight: 'in Leamington Spa.',
    subtitle:
      'Modern multi-page sites for Leamington Spa and Warwickshire businesses — built to rank, convert, and look expensive.',
    intro: [
      "Royal Leamington Spa has a design-conscious customer base — restaurants, salons, and boutiques that need to look as good online as they do in person. A premium business deserves a website that reflects it.",
      'VectorMoon builds premium custom sites for Leamington businesses — from £799, with multi-page SEO structure that helps you rank locally and a polished look that matches the town.',
    ],
    faqs: townFaqs('Leamington Spa', 'Warwickshire'),
  },
]

export function getLocation(slug) {
  return locations.find((l) => l.slug === slug)
}
