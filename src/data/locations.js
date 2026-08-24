function townFaqs(town, county) {
  return [
    {
      q: `How much does web design cost in ${town}?`,
      a: `VectorMoon packages start at £799 for a Core Build single-page site, £1,499 for a Growth Engine multi-page website, and from £2,999 for Enterprise Scale (including e-commerce). Local brochure competitors often price £699–£999; we sit just above that with higher-end custom design and multi-page SEO structure.`,
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
      a: 'Most Core Build and Growth Engine projects launch in about one to two weeks once content and feedback are ready.',
    },
  ]
}

// ISO 3166-2:GB region codes for per-town geo meta tags.
const COUNTY_REGION = {
  'West Midlands': 'GB-WMD',
  Warwickshire: 'GB-WAR',
  Staffordshire: 'GB-STS',
  Leicestershire: 'GB-LEC',
  Worcestershire: 'GB-WOR',
}

export function countyRegion(county) {
  return COUNTY_REGION[county] || 'GB-WMD'
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
    nearby: ['bedworth', 'nuneaton', 'warwick', 'solihull'],
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
    nearby: ['coventry', 'nuneaton', 'tamworth'],
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
    nearby: ['coventry', 'bedworth', 'tamworth'],
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
    nearby: ['leamington-spa', 'kenilworth', 'stratford-upon-avon'],
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
    nearby: ['warwick', 'kenilworth', 'coventry'],
  },
  {
    slug: 'kenilworth',
    town: 'Kenilworth',
    county: 'Warwickshire',
    title: 'Web Design Kenilworth | Local Website Designer — VectorMoon',
    description:
      'Web design in Kenilworth, Warwickshire. VectorMoon builds premium, fast, SEO-ready websites for local businesses. Packages from £799. Free strategy call.',
    eyebrow: 'Web design Kenilworth',
    heroTitle: 'Your local website studio',
    highlight: 'in Kenilworth.',
    subtitle:
      'Modern multi-page sites for Kenilworth and Warwickshire businesses — built to rank, convert, and look expensive.',
    intro: [
      "Kenilworth punches above its weight for a town its size — castle tourism, a moneyed commuter base, and an independent high street where customers expect polish before they pick up the phone. A dated or DIY site quietly costs you that first impression, and with bigger towns nearby there's always a competitor one search away.",
      'VectorMoon builds premium, fast, SEO-ready sites for Kenilworth businesses — from £799, with multi-page architecture that ranks on Google and AI search, and real portfolio proof. No template lock-in, no Birmingham agency overhead.',
    ],
    faqs: townFaqs('Kenilworth', 'Warwickshire'),
    nearby: ['coventry', 'warwick', 'leamington-spa'],
  },
  {
    slug: 'rugby',
    town: 'Rugby',
    county: 'Warwickshire',
    title: 'Web Design Rugby | Local Website Designer — VectorMoon',
    description:
      'Web design in Rugby, Warwickshire. VectorMoon builds modern, mobile-first, SEO-ready websites for local businesses. Packages from £799. Free strategy call.',
    eyebrow: 'Web design Rugby',
    heroTitle: 'Your local website studio',
    highlight: 'in Rugby.',
    subtitle:
      'Modern multi-page sites for Rugby and Warwickshire businesses — built to rank, convert, and look expensive.',
    intro: [
      "Rugby is growing fast — new homes, new commuters, and a high street of trades and independents that don't all show up online yet. The people moving in don't check the local paper first; they search on their phone, and if you're not there, the job goes to whoever is.",
      'VectorMoon builds modern, mobile-first, multi-page sites for Rugby businesses that rank locally, load fast, and turn searches into enquiries — with clear pricing from £799 and real portfolio proof.',
    ],
    faqs: townFaqs('Rugby', 'Warwickshire'),
    nearby: ['coventry', 'leamington-spa', 'warwick'],
  },
  {
    slug: 'solihull',
    town: 'Solihull',
    county: 'West Midlands',
    title: 'Web Design Solihull | Local Website Designer — VectorMoon',
    description:
      'Web design in Solihull, West Midlands. VectorMoon builds high-end, fast, SEO-ready websites for local businesses. Packages from £799. Free strategy call.',
    eyebrow: 'Web design Solihull',
    heroTitle: 'Your local website studio',
    highlight: 'in Solihull.',
    subtitle:
      'Modern multi-page sites for Solihull and West Midlands businesses — built to rank, convert, and look expensive.',
    intro: [
      "Solihull is an affluent, professional market — high-end retail, legal and financial services, and a customer base that expects a website to look as polished as the business. Yet plenty of local firms still pay Birmingham-agency prices for a site that works no harder than a brochure.",
      'VectorMoon gives Solihull businesses high-end custom design without the big-city overhead — multi-page sites from £799 that rank on Google and AI search, real portfolio proof, and a local studio that actually answers the phone.',
    ],
    faqs: townFaqs('Solihull', 'West Midlands'),
    nearby: ['birmingham', 'coventry', 'sutton-coldfield'],
  },
  {
    slug: 'stratford-upon-avon',
    town: 'Stratford-upon-Avon',
    county: 'Warwickshire',
    title: 'Web Design Stratford-upon-Avon | Local Website Designer — VectorMoon',
    description:
      'Web design in Stratford-upon-Avon, Warwickshire. VectorMoon builds premium, fast, SEO-ready websites for local businesses. Packages from £799. Free strategy call.',
    eyebrow: 'Web design Stratford-upon-Avon',
    heroTitle: 'Your local website studio',
    highlight: 'in Stratford-upon-Avon.',
    subtitle:
      'Modern multi-page sites for Stratford-upon-Avon and Warwickshire businesses — built to rank, convert, and look expensive.',
    intro: [
      "Stratford-upon-Avon lives on tourism — a steady stream of visitors who plan the trip on their phone before they arrive. Independent shops, restaurants, B&Bs, and attractions that don't show up cleanly on Google hand that footfall to the next result.",
      "VectorMoon builds premium, fast, SEO-ready sites for Stratford businesses — from £799, with multi-page architecture that ranks on Google and AI search, and real portfolio proof. No template lock-in, no Birmingham agency overhead.",
    ],
    faqs: townFaqs('Stratford-upon-Avon', 'Warwickshire'),
    nearby: ['warwick', 'kenilworth', 'alcester'],
  },
  {
    slug: 'birmingham',
    town: 'Birmingham',
    county: 'West Midlands',
    title: 'Web Design Birmingham | Local Website Designer — VectorMoon',
    description:
      'Web design in Birmingham, West Midlands. VectorMoon builds high-end, fast, SEO-ready websites for local businesses — without the city-centre overhead. Packages from £799.',
    eyebrow: 'Web design Birmingham',
    heroTitle: 'Your local website studio',
    highlight: 'in Birmingham.',
    subtitle:
      'Modern multi-page sites for Birmingham and West Midlands businesses — built to rank, convert, and look expensive.',
    intro: [
      "Birmingham is the region's biggest market — and its most crowded one. Local firms either pay city-agency prices for a brochure site or settle for a template that does nothing. You don't need a Birmingham postcode to out-rank the competition; you need a site built to rank.",
      "VectorMoon gives Birmingham businesses high-end custom design without the city-centre overhead — multi-page sites from £799 that rank on Google and AI search, real portfolio proof, and a West Midlands studio that actually answers the phone.",
    ],
    faqs: townFaqs('Birmingham', 'West Midlands'),
    nearby: ['solihull', 'sutton-coldfield', 'west-bromwich'],
  },
  {
    slug: 'wolverhampton',
    town: 'Wolverhampton',
    county: 'West Midlands',
    title: 'Web Design Wolverhampton | Local Website Designer — VectorMoon',
    description:
      'Web design in Wolverhampton, West Midlands. VectorMoon builds modern, fast, SEO-ready websites for local businesses. Packages from £799. Free strategy call.',
    eyebrow: 'Web design Wolverhampton',
    heroTitle: 'Your local website studio',
    highlight: 'in Wolverhampton.',
    subtitle:
      'Modern multi-page sites for Wolverhampton and West Midlands businesses — built to rank, convert, and look expensive.',
    intro: [
      "Wolverhampton's trades, independents, and professional services still lean heavily on word of mouth — but the first thing a new customer does is search on their phone. If you're not there, the job goes to whoever is.",
      "VectorMoon builds modern, fast, SEO-ready sites for Wolverhampton businesses — from £799, with multi-page architecture that ranks on Google and AI search, and real portfolio proof. No template lock-in, no Birmingham agency overhead.",
    ],
    faqs: townFaqs('Wolverhampton', 'West Midlands'),
    nearby: ['walsall', 'dudley', 'west-bromwich'],
  },
  {
    slug: 'sutton-coldfield',
    town: 'Sutton Coldfield',
    county: 'West Midlands',
    title: 'Web Design Sutton Coldfield | Local Website Designer — VectorMoon',
    description:
      'Web design in Sutton Coldfield, West Midlands. VectorMoon builds high-end, fast, SEO-ready websites for local businesses. Packages from £799. Free strategy call.',
    eyebrow: 'Web design Sutton Coldfield',
    heroTitle: 'Your local website studio',
    highlight: 'in Sutton Coldfield.',
    subtitle:
      'Modern multi-page sites for Sutton Coldfield and West Midlands businesses — built to rank, convert, and look expensive.',
    intro: [
      "Sutton Coldfield is an affluent, professional market — clients, solicitors, clinics, and salons whose customers expect polish before they pick up the phone. Yet plenty still pay big-city prices for a site that works no harder than a brochure.",
      "VectorMoon gives Sutton Coldfield businesses high-end custom design without the city-centre overhead — multi-page sites from £799 that rank on Google and AI search, real portfolio proof, and a local studio that actually answers the phone.",
    ],
    faqs: townFaqs('Sutton Coldfield', 'West Midlands'),
    nearby: ['birmingham', 'solihull', 'lichfield'],
  },
  {
    slug: 'walsall',
    town: 'Walsall',
    county: 'West Midlands',
    title: 'Web Design Walsall | Local Website Designer — VectorMoon',
    description:
      'Web design in Walsall, West Midlands. VectorMoon builds modern, fast, SEO-ready websites for local businesses. Packages from £799. Free strategy call.',
    eyebrow: 'Web design Walsall',
    heroTitle: 'Your local website studio',
    highlight: 'in Walsall.',
    subtitle:
      'Modern multi-page sites for Walsall and West Midlands businesses — built to rank, convert, and look expensive.',
    intro: [
      "Walsall's independent shops, salons, and trades live or die on local trust. A sharp, fast website turns that trust into booked work — and shows up when someone searches 'web design Walsall'.",
      "VectorMoon builds modern, fast, SEO-ready sites for Walsall businesses — from £799, with multi-page architecture that ranks on Google and AI search, and real portfolio proof. No template lock-in, no agency bloat.",
    ],
    faqs: townFaqs('Walsall', 'West Midlands'),
    nearby: ['wolverhampton', 'west-bromwich', 'dudley'],
  },
  {
    slug: 'dudley',
    town: 'Dudley',
    county: 'West Midlands',
    title: 'Web Design Dudley | Local Website Designer — VectorMoon',
    description:
      'Web design in Dudley, West Midlands. VectorMoon builds modern, fast, SEO-ready websites for local businesses. Packages from £799. Free strategy call.',
    eyebrow: 'Web design Dudley',
    heroTitle: 'Your local website studio',
    highlight: 'in Dudley.',
    subtitle:
      'Modern multi-page sites for Dudley and West Midlands businesses — built to rank, convert, and look expensive.',
    intro: [
      "Dudley and the Black Country are full of established trades and independents with reputations built over decades — but plenty still have no real presence online. A dated or DIY site quietly hands that reputation to a competitor one search away.",
      "VectorMoon builds modern, fast, SEO-ready sites for Dudley businesses — from £799, with multi-page architecture that ranks on Google and AI search, and real portfolio proof. No template lock-in, no agency bloat.",
    ],
    faqs: townFaqs('Dudley', 'West Midlands'),
    nearby: ['wolverhampton', 'west-bromwich', 'stourbridge'],
  },
  {
    slug: 'west-bromwich',
    town: 'West Bromwich',
    county: 'West Midlands',
    title: 'Web Design West Bromwich | Local Website Designer — VectorMoon',
    description:
      'Web design in West Bromwich, West Midlands. VectorMoon builds modern, fast, SEO-ready websites for local businesses. Packages from £799. Free strategy call.',
    eyebrow: 'Web design West Bromwich',
    heroTitle: 'Your local website studio',
    highlight: 'in West Bromwich.',
    subtitle:
      'Modern multi-page sites for West Bromwich and West Midlands businesses — built to rank, convert, and look expensive.',
    intro: [
      "West Bromwich sits at the centre of the West Midlands' busiest trade corridors. Its independents and family businesses are trusted in person but too often invisible online — a Facebook page quietly costing them enquiries.",
      "VectorMoon builds modern, fast, SEO-ready sites for West Bromwich businesses — from £799, with multi-page architecture that ranks on Google and AI search, and real portfolio proof. No template lock-in, no agency bloat.",
    ],
    faqs: townFaqs('West Bromwich', 'West Midlands'),
    nearby: ['birmingham', 'walsall', 'dudley'],
  },
  {
    slug: 'tamworth',
    town: 'Tamworth',
    county: 'Staffordshire',
    title: 'Web Design Tamworth | Local Website Designer — VectorMoon',
    description:
      'Web design in Tamworth, Staffordshire. VectorMoon builds modern, mobile-first, SEO-ready websites for local businesses. Packages from £799. Free strategy call.',
    eyebrow: 'Web design Tamworth',
    heroTitle: 'Your local website studio',
    highlight: 'in Tamworth.',
    subtitle:
      'Modern multi-page sites for Tamworth and Staffordshire businesses — built to rank, convert, and look expensive.',
    intro: [
      "Tamworth is growing fast — new homes, new commuters, and a high street of trades and independents that don't all show up online yet. The people moving in search on their phone first, and if you're not there, the job goes to whoever is.",
      "VectorMoon builds modern, mobile-first, multi-page sites for Tamworth businesses that rank locally, load fast, and turn searches into enquiries — with clear pricing from £799 and real portfolio proof.",
    ],
    faqs: townFaqs('Tamworth', 'Staffordshire'),
    nearby: ['sutton-coldfield', 'lichfield', 'atherstone'],
  },
]

export function getLocation(slug) {
  return locations.find((l) => l.slug === slug)
}
