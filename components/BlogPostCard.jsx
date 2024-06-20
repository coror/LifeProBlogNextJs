'use client';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { truncateText } from '@/datalayer/contentful/utils';

function BlogPostCard({ blogPost }) {
  const truncatedContent = truncateText(blogPost.content, 130);

  return (
    <div className='flex flex-col md:flex-row mb-6 mt-6 items-center'>
      <div className='w-full h-auto '>
        {blogPost.image && (
          <CldImage
            src={blogPost.image.url}
            alt={blogPost.seoTitle}
            className='rounded-xl shadow-xl '
            width={800}
            height={600}
          />
        )}
      </div>

      <div className='ml-0 md:ml-8 mt-4 md:mt-0'>
        <div className='flex flex-col w-full p-4 pt-1'>
          <h2 className='text-xl md:text-2xl font-bold text-center md:text-left'>
            {blogPost.headline}
          </h2>
          <p className='text-xs md:text-sm text-gray-500  text-center md:text-left'>
            {blogPost.datePosted}
          </p>
          <div className='mt-4 text-sm md:text-base text-center md:text-left'>
            {truncatedContent}
          </div>
        </div>
        <Link
          href={`/blogPosts/${blogPost.slug}`}
          className='m-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default BlogPostCard;
