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

    const res = await fetch(
      `${apiDomain}/blogPosts/${slug}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
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
      return [];
    }

    const res = await fetch(`${apiDomain}/categories`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    console.log('Fetched categories data:', data);

    // Directly access the name property without looking for nested fields
    const categories = data.categories.map((item) => ({
      name: item.name,
      // Add any other necessary fields here
    }));

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { fetchBlogPosts, fetchBlogPost, fetchCategories };
