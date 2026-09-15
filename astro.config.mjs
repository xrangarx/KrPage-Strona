import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  site: 'https://krpage.pl',
  integrations: [
    tailwind(),
  ],
  output: 'static',
})
