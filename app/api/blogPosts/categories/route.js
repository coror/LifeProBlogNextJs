import { getCategories } from '@/datalayer';

// GET /api/blogPosts/categories
export const GET = async (request, { params }) => {
  try {
    const categories = await getCategories();

    if (!categories || categories.length === 0) {
      return new Response('No categories found!', { status: 404 });
    }

    return new Response(JSON.stringify({ categories }), { status: 200 });
  } catch (error) {
    console.error('Error fetching data in homepage:', error.message);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
