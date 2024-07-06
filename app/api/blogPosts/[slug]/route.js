import { getBlogPostBySlug } from '@/datalayer/contentful/blogPost';

// GET /api/blogPosts/:slug
export const GET = async (request, { params }) => {
  try {
    const blogPost = await getBlogPostBySlug(params.slug);

    if (!blogPost) {
      return new Response('Blog post not found', { status: 404 });
    }

    return new Response(JSON.stringify({ blogPost }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
