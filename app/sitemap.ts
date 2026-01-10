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
    {
      url: `${baseUrl}/docs/quick-start`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Add all doc pages
  const addDocItems = (items: typeof docsConfig.mainNav) => {
    items.forEach((item) => {
      if (item.href) {
        routes.push({
          url: `${baseUrl}${item.href}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        })
      }
      if ('items' in item && item.items) {
        item.items.forEach((subItem) => {
          if (subItem.href) {
            routes.push({
              url: `${baseUrl}${subItem.href}`,
              lastModified: new Date(),
              changeFrequency: 'weekly',
              priority: 0.7,
            })
          }
        })
      }
    })
  }

  addDocItems(docsConfig.mainNav)
  addDocItems(docsConfig.sidebarNav)

  return routes
}

