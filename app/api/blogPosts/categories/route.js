import { getCategories } from '@/datalayer';

// GET /api/blogPosts/categories
export const GET = async (request, { params }) => {
  try {
    const categories = await getCategories();

    if (!categories) {
      return new Response('No categories found!', { status: 404 });
    }

    return new Response(JSON.stringify({ categories }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
