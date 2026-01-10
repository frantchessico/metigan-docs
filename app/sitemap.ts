import { MetadataRoute } from 'next'
import { docsConfig } from '@/lib/docs-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.metigan.com'
  
  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // Add all doc pages from docsConfig
  docsConfig.forEach((section) => {
    section.items.forEach((item) => {
      if (item.href) {
        routes.push({
          url: `${baseUrl}${item.href}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        })
      }
    })
  })

  return routes
}

