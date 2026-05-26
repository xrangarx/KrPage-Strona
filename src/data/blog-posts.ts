export interface BlogPost {
  slug: string
  category: string
  title: string
  desc: string
  date: string
  readTime: string
  image: string
}

export const posts: BlogPost[] = [
  {
    slug: 'audyt-seo-krok-po-kroku',
    category: 'Tech SEO',
    title: 'Audyt SEO krok po kroku — kompletny przewodnik 2025',
    desc: 'Dowiedz się jak przeprowadzić pełny audyt techniczny strony. Omawiamy Core Web Vitals, crawlowanie, indeksowanie i profil linkowy.',
    date: '2026-01-15',
    readTime: '12 min',
    image: 'https://picsum.photos/seed/seoaudit/800/450',
  },
  {
    slug: 'topical-authority-budowanie',
    category: 'Strategia',
    title: 'Topical Authority — jak zbudować autorytet tematyczny domeny',
    desc: 'Topical authority to jeden z kluczowych czynników rankingowych Google w 2025. Wyjaśniamy jak projektować silosy i mapę tematyczną.',
    date: '2026-02-03',
    readTime: '9 min',
    image: 'https://picsum.photos/seed/topical2025/800/450',
  },
  {
    slug: 'core-web-vitals-optymalizacja',
    category: 'Tech SEO',
    title: 'Core Web Vitals 2025 — jak osiągnąć zielone wyniki',
    desc: 'LCP, CLS, INP — kompleksowy przewodnik po optymalizacji Core Web Vitals dla WordPressa, Astro i niestandardowych stron.',
    date: '2026-02-20',
    readTime: '11 min',
    image: 'https://picsum.photos/seed/webvitals/800/450',
  },
  {
    slug: 'link-building-strategie',
    category: 'Link Building',
    title: 'Link Building w 2025 — strategie które działają',
    desc: 'Guest posting, digital PR, broken link building i linkowanie wewnętrzne. Które strategie przynoszą najlepszy ROI w polskim SEO.',
    date: '2026-03-05',
    readTime: '14 min',
    image: 'https://picsum.photos/seed/linkbuild25/800/450',
  },
  {
    slug: 'nlp-seo-optymalizacja-tresci',
    category: 'Content',
    title: 'NLP w SEO — jak pisać treści pod algorytmy Google',
    desc: 'Google rozumie kontekst i semantykę. Pokazujemy jak używać NLP, LSI i encji do tworzenia treści rankujących w TOP3.',
    date: '2026-03-18',
    readTime: '8 min',
    image: 'https://picsum.photos/seed/nlpcontent/800/450',
  },
  {
    slug: 'local-seo-gmb-optymalizacja',
    category: 'Local SEO',
    title: 'Local SEO i Google Moja Firma — kompletny poradnik',
    desc: 'Jak zoptymalizować profil GMB, zdobyć recenzje i dominować w lokalnych wynikach Google Maps dla swojego biznesu.',
    date: '2026-04-01',
    readTime: '10 min',
    image: 'https://picsum.photos/seed/localseo25/800/450',
  },
]

export const categories = ['Wszystkie', 'Tech SEO', 'Strategia', 'Content', 'Link Building', 'Local SEO']
