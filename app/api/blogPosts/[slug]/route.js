import { getBlogPostBySlug } from '@/datalayer/contentful/blogPost';

// GET /api/blogPosts/:slug
export const GET = async (request, { params }) => {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en-US';
    console.log(`Language parameter received: ${language}`);  // Add this line for logging
    const blogPost = await getBlogPostBySlug(params.slug, language);

    if (!blogPost) {
      return new Response('Blog post not found', { status: 404 });
    }

    return new Response(JSON.stringify({ blogPost }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
