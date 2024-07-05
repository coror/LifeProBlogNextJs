import BlogPostCard from './BlogPostCard';

const BlogPostList = ({ blogPosts }) => {
  // Sort blog posts by datePosted in descending order to get the most recent one first
  const sortedBlogPosts = [...blogPosts].sort(
    (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
  );

  return (
    <div className='container-xl lg:container m-4'>
      {sortedBlogPosts.length === 0 ? (
        <p>No blogPosts found</p>
      ) : (
        <div className='flex flex-col w-full'>
          {sortedBlogPosts.map((blogPost) => (
            <BlogPostCard key={blogPost.id} blogPost={blogPost} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPostList;
