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

    // Hero & intro
    hero_desc:         z.string().optional(),
    zakres_desc:       z.string().optional(),
    cta_title:         z.string().optional(),
    cta_desc:          z.string().optional(),

    // 6-item grids (shared by most service pages)
    item1_title: z.string().optional(), item1_desc: z.string().optional(),
    item2_title: z.string().optional(), item2_desc: z.string().optional(),
    item3_title: z.string().optional(), item3_desc: z.string().optional(),
    item4_title: z.string().optional(), item4_desc: z.string().optional(),
    item5_title: z.string().optional(), item5_desc: z.string().optional(),
    item6_title: z.string().optional(), item6_desc: z.string().optional(),

    // Case studies (pozycjonowanie)
    case1_cat: z.string().optional(), case1_result: z.string().optional(), case1_period: z.string().optional(), case1_desc: z.string().optional(),
    case2_cat: z.string().optional(), case2_result: z.string().optional(), case2_period: z.string().optional(), case2_desc: z.string().optional(),
    case3_cat: z.string().optional(), case3_result: z.string().optional(), case3_period: z.string().optional(), case3_desc: z.string().optional(),

    // Branże tiles (pozycjonowanie-lokalne)
    branza1_label: z.string().optional(),
    branza2_label: z.string().optional(),
    branza3_label: z.string().optional(),
    branza4_label: z.string().optional(),

    // Stack tiles (strony-internetowe)
    stack1_label: z.string().optional(),
    stack2_label: z.string().optional(),
    stack3_label: z.string().optional(),
    stack4_label: z.string().optional(),

    // Content types in hero (content-marketing)
    type1_title: z.string().optional(), type1_desc: z.string().optional(),
    type2_title: z.string().optional(), type2_desc: z.string().optional(),
    type3_title: z.string().optional(), type3_desc: z.string().optional(),
    type4_title: z.string().optional(), type4_desc: z.string().optional(),

    // Process steps (content-marketing)
    step1_title: z.string().optional(), step1_desc: z.string().optional(),
    step2_title: z.string().optional(), step2_desc: z.string().optional(),
    step3_title: z.string().optional(), step3_desc: z.string().optional(),
    step4_title: z.string().optional(), step4_desc: z.string().optional(),
    step5_title: z.string().optional(), step5_desc: z.string().optional(),

    // Stats (content-marketing)
    stat1_value: z.string().optional(), stat1_label: z.string().optional(),
    stat2_value: z.string().optional(), stat2_label: z.string().optional(),
    stat3_value: z.string().optional(), stat3_label: z.string().optional(),
    stat4_value: z.string().optional(), stat4_label: z.string().optional(),

    // Platform labels (pozycjonowanie-sklepow)
    platform1_label: z.string().optional(),
    platform2_label: z.string().optional(),
    platform3_label: z.string().optional(),
    platform4_label: z.string().optional(),

    // Audyt SEO specific blocks
    block_tech_title:    z.string().optional(),
    block_tech_desc:     z.string().optional(),
    block_tech_items:    z.string().optional(),
    block_keyword_title: z.string().optional(),
    block_keyword_desc:  z.string().optional(),
    block_ux_title:      z.string().optional(),
    block_ux_desc:       z.string().optional(),
    block_intel_title:   z.string().optional(),
    block_intel_desc:    z.string().optional(),
    block_intel_tags:    z.string().optional(),
    problems_intro:      z.string().optional(),
    problem1_title:      z.string().optional(),
    problem1_desc:       z.string().optional(),
    problem2_title:      z.string().optional(),
    problem2_desc:       z.string().optional(),
    problem3_title:      z.string().optional(),
    problem3_desc:       z.string().optional(),
  }),
})

export const collections = { blog, realizacje, pages, uslugi }
