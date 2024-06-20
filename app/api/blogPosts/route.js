import { getBlogPosts } from '@/datalayer';

// GET /api/blogPosts
export const GET = async (request) => {
  try {
    const blogPosts = await getBlogPosts();
    // console.log('API blogPosts:', blogPosts);  // Add this line

    return new Response(JSON.stringify({ blogPosts }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
