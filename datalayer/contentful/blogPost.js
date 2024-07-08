import { client } from './client';
import { blogPostReducer } from './utils';

export const getBlogPosts = async (language = 'en-US') => {
  try {
    // Adjust language to 'en-US' if 'en' is passed
    const adjustedLanguage = language === 'en' ? 'en-US' : language;

    console.log(`Fetching blog posts for language : ${adjustedLanguage}`);
    const res = await client.getEntries({
      content_type: 'blogPost',
      locale: adjustedLanguage,
    });

    console.log('Fetched blog posts response:');
    console.log(res.items);

    const rawBlogPosts = res.items;
    const blogPosts = rawBlogPosts.map((rawBlogPost) =>
      blogPostReducer(rawBlogPost)
    );

    console.log(blogPosts);

    return blogPosts;
  } catch (error) {
    console.log(`Error fetching blog posts for ${language}`, error);
    return [];
  }
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

export const getBlogPostBySlug = async (slug, language = 'en-US') => {
  try {
    // Adjust language to 'en-US' if 'en' is passed
    const adjustedLanguage = language === 'en' ? 'en-US' : language;

    console.log(`Fetching blog post for slug: ${slug}, language: ${adjustedLanguage}`);
    const found = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      include: 2,
      locale: adjustedLanguage,
    });

    console.log(`Raw API response for slug: ${slug}, language: ${adjustedLanguage}`, found); // Detailed logging

    if (found.items.length === 0) {
      console.log(`Blog post not found for slug: ${slug}`);
      return null;
    }

    const blogPost = found.items[0];
    return blogPostReducer(blogPost);
  } catch (error) {
    console.error(`Error fetching blog post for slug ${slug} and language ${language}`, error);
    return null;
  }
};


// export const getCategories = async () => {
//   try {
//     const categories = await fetchPredefinedCategories();
//     return categories;
//   } catch (error) {
//     console.error('Error in getCategories:', error.message);
//     throw new Error('Failed to get categories');
//   }
// };