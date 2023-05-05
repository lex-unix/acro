import { defineConfig } from 'astro/config'
import storyblok from '@storyblok/astro'
import tailwind from '@astrojs/tailwind'
import { loadEnv } from 'vite'
import sitemap from '@astrojs/sitemap'

const env = loadEnv('', process.cwd(), 'STORYBLOK')

export default defineConfig({
  site: 'https://acro.lexunix.me',
  integrations: [
    tailwind(),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        projectList: 'storyblok/ProjectList',
        page: 'storyblok/Page',
        project: 'storyblok/Project'
      }
    }),
    sitemap()
  ]
})
