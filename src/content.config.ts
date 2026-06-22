import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    date:        z.string(),
    category:    z.enum(['Tech SEO', 'Strategia', 'Content', 'Link Building', 'Local SEO']),
    image:       z.string().optional().default('https://placehold.co/800x450/050A07/2DFF5F?text=KrPage+SEO'),
    readTime:    z.string(),
  }),
})

const realizacje = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/realizacje' }),
  schema: z.object({
    title:       z.string(),
    type:        z.enum(['SEO', 'Strona']),
    industry:    z.string(),
    result:      z.string(),
    resultLabel: z.string(),
    period:      z.string(),
    image:       z.string().optional().default('https://placehold.co/800x450/050A07/2DFF5F?text=KrPage+SEO'),
    tags:        z.array(z.string()),
  }),
})

export const collections = { blog, realizacje }
