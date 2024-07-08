'use client';
import BlogPostList from './BlogPostList';
import { useEffect, useState } from 'react';
import { fetchBlogPosts } from '@/utils/request';

import { useCurrentLocale } from 'next-i18n-router/client';
import i18nConfig from '@/i18nConfig';

const BlogPostPageListComponent = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const locale = useCurrentLocale(i18nConfig);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedBlogPosts = await fetchBlogPosts(locale);
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
  }, [locale]);

  return (
    <div>
      {' '}
      <section className='px-4 py-6'>
        <BlogPostList blogPosts={blogPosts} />
      </section>
    </div>
  );
};

export default BlogPostPageListComponent;
