import FeaturedBlogPostCard from './FeaturedBlogPostCard'

function FeaturedBlogPostsList({blogPosts}) {


  // If blogPosts is undefined or empty, return null or a message
  if (!blogPosts || blogPosts.length === 0) {
    return <p>No blog posts available</p>;
  }
  // Sort blog posts by datePosted in descending order to get the most recent one first
  const sortedBlogPosts = [...blogPosts].sort(
    (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
  );

  // Destructure the first blog post from the sorted array
  const [mostRecentBlogPost, ...otherBlogPosts] = sortedBlogPosts;

  return (
    <div className='flex flex-col lg:flex-row m-4 lg:m-24 space-y-4 lg:space-y-0 lg:space-x-4'>
      {/* Main post */}
      <div className='w-full lg:w-2/3'>
        <FeaturedBlogPostCard
          blogPost={mostRecentBlogPost}
          isFirstItem={true}
        />
      </div>

      {/* Other posts */}
      <div className='flex flex-col space-y-4 w-full lg:w-1/3'>
        {otherBlogPosts.map((blogPost) => (
          <FeaturedBlogPostCard blogPost={blogPost} key={blogPost.id} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedBlogPostsList;
