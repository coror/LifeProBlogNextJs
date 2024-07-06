'use client';
import { useEffect, useState } from 'react';
import { fetchBlogPosts } from '@/utils/request';
import BlogPostCard from '@/components/BlogPostCard';

const BlogPostsPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        const fetchedBlogPosts = await fetchBlogPosts();
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
  }, []);

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {loading ? (
          <p>Loading...</p>
        ) : blogPosts.length === 0 ? (
          <p>No blog posts found</p>
        ) : (
          <div className='flex flex-col lg:w-3/4 w-full'>
            {blogPosts.map((blogPost) => (
              <BlogPostCard key={blogPost.id} blogPost={blogPost} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostsPage;
