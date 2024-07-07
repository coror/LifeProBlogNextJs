'use client';
import BlogPostList from './BlogPostList';
import { useEffect, useState } from 'react';
import { fetchBlogPosts } from '@/utils/request';

const BlogPostPageComponent = ({ currentLocale }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedBlogPosts = await fetchBlogPosts(currentLocale);
        fetchedBlogPosts.sort(
          (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
        );
        setBlogPosts(fetchedBlogPosts);
      } catch (error) {
        console.error('Error fetching data in homepage', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentLocale]);

  return (
    <div>
      {' '}
      <section className='px-4 py-6'>
        <BlogPostList blogPosts={blogPosts} />
      </section>
    </div>
  );
};

export default BlogPostPageComponent;
