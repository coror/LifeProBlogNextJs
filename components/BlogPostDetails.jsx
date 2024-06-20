import { CldImage } from 'next-cloudinary';


const BlogPostDetails = ({ blogPost }) => {
  return (
    <div className='flex flex-col items-center m-10'>
      <div className='w-full mb-4 flex items-center justify-center relative lg:w-[45rem] lg:h-[25rem] lg:mb-8'>
        <CldImage
          src={blogPost.image.url}
          alt={blogPost.image.alt}
          width={600}
          height={600}
          className='rounded-lg shadow-2xl w-auto h.auto'
          priority
        />
      </div>
      <h1 className='text-3xl md:text-5xl font-bold text-gray-900 mb-4'>
        {blogPost.seoTitle}
      </h1>
      <div className='text-sm text-gray-500 mb-12'>
        <span className='font-medium text-gray-700'>PUBLISHED</span>{' '}
        {blogPost.datePosted}
      </div>
      <div className='prose max-w-none mb-8 leading-8'>
        <div
          dangerouslySetInnerHTML={{
            __html: blogPost.content,
          }}
        />
      </div>
      <div className='prose max-w-none'>
        <div
          dangerouslySetInnerHTML={{
            __html: blogPost.advice,
          }}
        />
      </div>
    </div>
  );
};

export default BlogPostDetails;
