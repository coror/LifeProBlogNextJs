import { getBlogPosts } from '@/datalayer';

// GET /api/blogPosts
export const GET = async (request) => {
  try {

    console.log(`Received language parameter: `);

    // Fetch blog posts based on the language parameter
    const blogPosts = await getBlogPosts();

    console.log(`Fetched ${blogPosts.length} blog posts for `);

    return new Response(JSON.stringify({ blogPosts }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
