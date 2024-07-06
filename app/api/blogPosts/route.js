import { getBlogPosts } from '@/datalayer';

// GET /api/blogPosts
export const GET = async (request) => {
  try {
    // Parse query parameters from the URL
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en-US';

    console.log(`Received language parameter: ${language}`);

    // Fetch blog posts based on the language parameter
    const blogPosts = await getBlogPosts(language);

    console.log(`Fetched ${blogPosts.length} blog posts for ${language}`);

    return new Response(JSON.stringify({ blogPosts }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
