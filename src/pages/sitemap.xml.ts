import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { SITE } from '../data/site'

const BASE = SITE.url.replace(/\/$/, '')

const staticPages = [
  { loc: `${BASE}/`,                        priority: '1.0', changefreq: 'weekly'  },
  { loc: `${BASE}/blog`,                    priority: '0.9', changefreq: 'daily'   },
  { loc: `${BASE}/jak-dzialm`,              priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE}/jak-buduje-stronki`,      priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE}/o-mnie`,                  priority: '0.6', changefreq: 'monthly' },
  { loc: `${BASE}/kontakt`,                 priority: '0.7', changefreq: 'monthly' },
  { loc: `${BASE}/uslugi`,                  priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE}/uslugi/audyt-seo`,        priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE}/uslugi/pozycjonowanie`,   priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE}/uslugi/pozycjonowanie-lokalne`,  priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE}/uslugi/pozycjonowanie-sklepow`,  priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE}/uslugi/pozycjonowanie-stron`,    priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE}/uslugi/konsultacje-seo`,  priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE}/uslugi/content-marketing`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE}/uslugi/strony-internetowe`, priority: '0.8', changefreq: 'monthly' },
]

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog')

  const blogEntries = posts.map(p => ({
    loc:        `${BASE}/blog/${p.id}`,
    lastmod:    p.data.date_modified ?? p.data.date,
    priority:   '0.7',
    changefreq: 'monthly',
  }))

  const allUrls = [...staticPages, ...blogEntries]

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
    '          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    ...allUrls.map(u => [
      '  <url>',
      `    <loc>${u.loc}</loc>`,
      u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : '',
      `    <changefreq>${u.changefreq}</changefreq>`,
      `    <priority>${u.priority}</priority>`,
      '  </url>',
    ].filter(Boolean).join('\n')),
    '</urlset>',
  ].join('\n')

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
