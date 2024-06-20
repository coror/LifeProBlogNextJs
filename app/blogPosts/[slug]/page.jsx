'use client';
import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchBlogPost } from '@/utils/request';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import BlogPostDetails from '@/components/BlogPostDetails';

const BlogPostPage = () => {
  const { slug } = useParams();

  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPostData = async () => {
      if (!slug) return;
      try {
        const blogPost = await fetchBlogPost(slug);
        setBlogPost(blogPost);
      } catch (error) {
        console.error('Error fetching blogPost:', error);
      } finally {
        setLoading(false);
      }
    };

    if (blogPost === null) {
      fetchBlogPostData();
    }
  }, [slug, blogPost]);

  if (!blogPost && !loading) {
    notFound(); // to redirect to our page
  }

  return (
    <div>
      {!loading && blogPost && (
        <div className='px-6 md:px-4 lg:px-8 lg:py-8 w-full flex flex-col lg:w-2/3  md:ml-10 max-w-7xl mx-auto lg:flex-row lg:space-x-8 xl:space-x-16'>
          <div className='mt-4'>
            <Link href='/'>
              <div className='inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-md font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                <ChevronLeftIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                Back To Blog Posts
              </div>
            </Link>
            <BlogPostDetails blogPost={blogPost} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostPage;
