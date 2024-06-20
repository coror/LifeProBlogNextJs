import { client } from './client';
import { blogPostReducer, categoriesReducer } from './utils';

export const getBlogPosts = async () => {
  const res = await client.getEntries({ content_type: 'blogPost' });
  const rawBlogPosts = res.items;
  const blogPosts = rawBlogPosts.map((rawBlogPost) =>
    blogPostReducer(rawBlogPost)
  );
  // console.log(blogPosts);
  return blogPosts;
};

export const getSlugs = async () => {
  const rawSlugs = await client.getEntries({
    content_type: 'blogPost',
    select: ['fields.slug'],
  });

  console.log('rawSlugs ===>', rawSlugs.items);

  const slugs = rawSlugs.items.map((rawSlug) => rawSlug.fields.slug);
  console.log(slugs);
  return slugs;
};

export const getBlogPostBySlug = async (slug) => {
  const found = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    include: 2,
  });

  if (found.items.length === 0) return null;
  const blogPost = found.items[0];
  return blogPostReducer(blogPost);
};

export const getCategories = async () => {
  const res = await client.getEntries({ content_type: 'blogPost' });
  const rawBlogPosts = res.items;

  const categories = categoriesReducer(rawBlogPosts);
  return categories;
};
