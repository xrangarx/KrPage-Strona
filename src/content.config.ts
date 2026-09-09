import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    date:        z.string(),
    category:    z.enum(['Tech SEO', 'Strategia', 'Content', 'Link Building', 'Local SEO']),
    image:       z.string().optional().default('https://placehold.co/800x450/06070F/404DFF?text=KrPage+SEO'),
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
    image:       z.string().optional().default('https://placehold.co/800x450/06070F/404DFF?text=KrPage+SEO'),
    tags:        z.array(z.string()),
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

const uslugi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/uslugi' }),
  schema: z.object({
    title:             z.string(),
    description:       z.string().optional(),
    image:             z.string().optional(),
    hero_desc:         z.string().optional(),
    zakres_desc:       z.string().optional(),
    block_tech_title:  z.string().optional(),
    block_tech_desc:   z.string().optional(),
    block_tech_items:  z.string().optional(),
    block_keyword_title: z.string().optional(),
    block_keyword_desc:  z.string().optional(),
    block_ux_title:    z.string().optional(),
    block_ux_desc:     z.string().optional(),
    block_intel_title: z.string().optional(),
    block_intel_desc:  z.string().optional(),
    block_intel_tags:  z.string().optional(),
    problems_intro:    z.string().optional(),
    problem1_title:    z.string().optional(),
    problem1_desc:     z.string().optional(),
    problem2_title:    z.string().optional(),
    problem2_desc:     z.string().optional(),
    problem3_title:    z.string().optional(),
    problem3_desc:     z.string().optional(),
  }),
})

export const collections = { blog, realizacje, pages, uslugi }
