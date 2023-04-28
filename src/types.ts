import type { ISbRichtext } from '@storyblok/astro'

export type Asset = {
  filename: string
  alt: string
}

export type Project = {
  name: string
  architects: string
  location: string
  slug: string
  content: ISbRichtext
  year: string
  photographs: string
  cover: Asset
}
