import { fetchBlogPosts } from '@/utils/request';
import BlogPostCard from '@/components/BlogPostCard';

export const metadata = {
  title: 'LifePlus | Blog Posts'
}

const BlogPostsPage = async () => {
  const blogPosts = await fetchBlogPosts();

  // Sort blogPosts by date
  blogPosts.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {blogPosts.length === 0 ? (
          <p>No blogPosts found</p>
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
