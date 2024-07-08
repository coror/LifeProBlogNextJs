'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import BlogPostDetails from './BlogPostDetails';
import { fetchBlogPost } from '@/utils/request';
import { useTranslation } from 'react-i18next';

const BlogPostPageComponent = ({ currentLocale }) => {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
console.log('Current locale:', currentLocale)

    const fetchBlogPostData = async () => {
      if (!slug || !currentLocale) {
        console.log('Slug or currentLocale is undefined:', slug, currentLocale);
        return;
      }
      setLoading(true); // Set loading to true before fetching new data
      try {
        const fetchedBlogPost = await fetchBlogPost(slug, currentLocale);
        setBlogPost(fetchedBlogPost);
      } catch (error) {
        console.error('Error fetching blogPost:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlogPostData(); // Always trigger fetch on component mount or slug change
  }, [slug, currentLocale]); // Re-fetch whenever slug or language changes

  if (!blogPost && !loading) {
    notFound(); // Handle not found scenario
  }

  return (
    <div>
      {!loading && blogPost && (
        <div>
          <nav className='mt-4' aria-label='Breadcrumb'>
            <ol role='list' className='flex items-center px-10'>
              <li>
                <Link
                  href='/'
                  className='text-gray-400 hover:text-gray-600 transition flex items-center flex-row mx-1'
                >
                  {t('navbar:home')}
                </Link>
              </li>
              <li className='text-gray-400 mx-1'>&gt;</li>
              <li className='text-gray-600 mx-1'>{blogPost.seoTitle}</li>
            </ol>
          </nav>
          <div className='mt-4'>
            <BlogPostDetails blogPost={blogPost} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostPageComponent;
