import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title:           z.string(),
    description:     z.string(),
    date:            z.string(),
    category:        z.enum(['Tech SEO', 'Strategia', 'Content', 'Link Building', 'Local SEO']),
    image:           z.string().optional().default('https://placehold.co/800x450/06070F/404DFF?text=KrPage+SEO'),
    readTime:        z.string(),

    // SEO overrides — gdy inne niż tytuł/opis wpisu
    og_title:        z.string().optional(),
    og_description:  z.string().optional(),
    canonical:       z.string().optional(),
    noindex:         z.boolean().optional().default(false),

    // Schema.org
    schema_type:     z.enum(['BlogPosting', 'Article', 'HowTo', 'FAQPage']).optional().default('BlogPosting'),
    focus_keyphrase: z.string().optional(),
    date_modified:   z.string().optional(),
    tags:            z.array(z.string()).optional(),

    // FAQ — generuje FAQPage JSON-LD jeśli wypełnione
    faq1_q: z.string().optional(), faq1_a: z.string().optional(),
    faq2_q: z.string().optional(), faq2_a: z.string().optional(),
    faq3_q: z.string().optional(), faq3_a: z.string().optional(),
    faq4_q: z.string().optional(), faq4_a: z.string().optional(),
    faq5_q: z.string().optional(), faq5_a: z.string().optional(),
  }),
})

const realizacje = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/realizacje' }),
  schema: z.object({
    title:               z.string(),
    type:                z.enum(['SEO', 'Strona']),
    industry:            z.string(),
    result:              z.string(),
    resultLabel:         z.string(),
    period:              z.string(),
    image:               z.string().optional().default('https://placehold.co/800x450/06070F/404DFF?text=KrPage+SEO'),
    tags:                z.array(z.string()),

    // SEO
    og_description:      z.string().optional(),
    noindex:             z.boolean().optional().default(false),
    schema_service_type: z.string().optional(),

    // Klient & social proof
    client_url:          z.string().optional(),
    testimonial:         z.string().optional(),
    testimonial_author:  z.string().optional(),
  }),
})

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title:       z.string(),
    description: z.string().optional(),
    image:       z.string().optional(),
  }),
})

export const collections = { blog, realizacje, pages }
