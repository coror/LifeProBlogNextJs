'use client';
import Spinner from '@/components/Spinner';
import BlogPostList from '@/components/BlogPostList';
import CategorySection from '@/components/CategorySection';
import FeaturedBlogPostsList from '@/components/FeaturedBlogPostsList';
import { fetchBlogPosts, fetchCategories } from '@/utils/request';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredBlogPosts, setFeaturedBlogPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBlogPosts = await fetchBlogPosts();
        const fetchedCategories = await fetchCategories();
        setBlogPosts(fetchedBlogPosts);
        setCategories(['show all', ...fetchedCategories]);
        setFeaturedBlogPosts(fetchedBlogPosts);
      } catch (error) {
        console.error('Error fetching data in homepage', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredBlogPosts =
    selectedCategory && selectedCategory !== 'show all'
      ? blogPosts.filter((post) => post.category === selectedCategory)
      : blogPosts;

  return (
    <div>
      <link rel="icon" href="" sizes="any" />
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div>
          <div>
            <FeaturedBlogPostsList blogPosts={featuredBlogPosts} />
          </div>
          <div className='flex flex-col md:flex-row lg:m-24'>
            <BlogPostList blogPosts={filteredBlogPosts} />
            <CategorySection
              categories={categories}
              onCategoryClick={handleCategoryClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
