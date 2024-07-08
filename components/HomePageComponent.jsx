'use client';
import Spinner from '@/components/Spinner';
import BlogPostList from '@/components/BlogPostList';
import CategorySection from '@/components/CategorySection';
import FeaturedBlogPostsList from '@/components/FeaturedBlogPostsList';
import { fetchBlogPosts, fetchCategories } from '@/utils/request';
import { useEffect, useState } from 'react';

import { useCurrentLocale } from 'next-i18n-router/client';
import i18nConfig from '@/i18nConfig';

const HomePageComponent = ({ currentLocale }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredBlogPosts, setFeaturedBlogPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('show all');
  const [loading, setLoading] = useState(true);

  const locale = useCurrentLocale(i18nConfig);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Ensure loading state is set to true when refetching
        console.log('Fetching data for language:'); // Debugging statement
        const fetchedBlogPosts = await fetchBlogPosts(locale);
        const fetchedCategories = await fetchCategories();
        setBlogPosts(fetchedBlogPosts);
        setCategories([{ name: 'show all' }, ...fetchedCategories]);
        setFeaturedBlogPosts(fetchedBlogPosts);
      } catch (error) {
        console.error('Error fetching data in homepage', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredBlogPosts =
    selectedCategory && selectedCategory !== 'show all'
      ? blogPosts.filter((post) => post.categories.includes(selectedCategory))
      : blogPosts;

  return (
    <div>
      <link rel='icon' href='' sizes='any' />
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
              categories={categories.map((category) => category.name)}
              onCategoryClick={handleCategoryClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageComponent;
