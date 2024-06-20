export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/private'], // to not show up in google
    },
    sitemap: `${process.env.NEXT_PUBLIC_DOMAIN}/sitemap.xml`,
  };
}
