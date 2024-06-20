import { fetchBlogPosts } from '@/utils/request';

export default async function sitemap() {
  const blogPosts = await fetchBlogPosts();

  const sitemapEntries = blogPosts.map(({ slug }) => ({
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/blogPosts/${slug}`,
    // lastModified: new Date(post.updatedAt),
    // changeFrequency;,
    // priority:
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/blogPosts`,
      lastModified: new Date(),
    },
    ...sitemapEntries,
  ];
}
