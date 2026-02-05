// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 如果你有后台管理页面，可以在这里 disallow: '/admin/'
    },
    sitemap: 'https://www.auvtek.com/sitemap.xml', // 指向你刚创建的站点地图
  }
}