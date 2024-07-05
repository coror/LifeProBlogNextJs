import { getCategories } from '@/datalayer/contentful/category';

export const GET = async (request) => {
  try {
    const {searchParams} = new URL(request.url)
    const language = searchParams.get('language') || 'en-US'
    const rawCategories = await getCategories(language);

    if (!rawCategories || rawCategories.length === 0) {
      return new Response('No categories found!', { status: 404 });
    }

    const categories = rawCategories.map((category) => ({
      name: category.fields.name,
      // Add any other necessary fields here
    }));

    return new Response(JSON.stringify({ categories }), { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
