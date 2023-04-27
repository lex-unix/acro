import type { ISbResult } from '@storyblok/astro'

export type Project = {
  name: string
  architects: string
  location: string
  slug: string
  content: ISbResult
  year: string
  photographs: string
  cover: {
    filename: string
    alt: string
  }
}
