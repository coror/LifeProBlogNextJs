// BlogPostPage.jsx
'use client'
import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import BlogPostDetails from '@/components/BlogPostDetails';
import { fetchBlogPost } from '@/utils/request';
import { useLanguage } from '@/app/contexts/LanguageContext';

const BlogPostPage = () => {
  const { slug } = useParams();
  const { language } = useLanguage(); // Note the correct usage of useLanguage hook
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPostData = async () => {
      if (!slug) return;
      setLoading(true); // Set loading to true before fetching new data
      try {
        const fetchedBlogPost = await fetchBlogPost(slug, language);
        setBlogPost(fetchedBlogPost);
      } catch (error) {
        console.error('Error fetching blogPost:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlogPostData(); // Always trigger fetch on component mount or slug change
  }, [slug, language]); // Re-fetch whenever slug or language changes

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
                  Home
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

export default BlogPostPage;
