const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// fetch all blogposts
async function fetchBlogPosts() {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/blogPosts`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    // console.log('Fetched data:', data);

    return data.blogPosts;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Fetch single blogPost
async function fetchBlogPost(slug) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/blogPosts/${slug}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    // console.log('Fetched data:', data);

    return data.blogPost;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Fetch all categories
async function fetchCategories() {
  try {
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/blogPosts/categories`);

    if (!res.ok) {
      throw new Error('Faild to fetch data');
    }

    const data = await res.json();

    return data.categories;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchBlogPosts, fetchBlogPost, fetchCategories };
