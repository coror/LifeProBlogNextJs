'use client'
import React from 'react';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';

function FeaturedBlogPostCard({ blogPost, isFirstItem }) {
  // console.log(blogPost)
  if (isFirstItem) {
    return (
      <Link href={`/blogPosts/${blogPost.slug}`}>
        <div className='relative overflow-hidden rounded-lg shadow-md h-96 lg:h-full'>
          <CldImage
            src={blogPost.image.url}
            alt={blogPost.image.alt}
            fill={true}
            className='rounded-lg'
            priority={true}
            style={{ objectFit: 'cover' }}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
          />
          <div className='absolute bottom-0 left-0 w-full bg-white bg-opacity-75 p-4'>
            <div className='text-2xl font-bold hover:text-blue-400'>{blogPost.headline}</div>
            <div className='text-gray-500 text-xs'>{blogPost.datePosted}</div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blogPosts/${blogPost.slug}`}>
    <div className='flex h-24 lg:h-40 overflow-hidden rounded-lg shadow-md'>
      <div className='relative w-1/3 h-full'>
        <CldImage
          src={blogPost.image.url}
          alt={blogPost.image.alt}
          fill={true}
          className='rounded-l-lg'
          style={{ objectFit: 'cover', height: '100%' }}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw'
        />
      </div>
      <div className='flex flex-col justify-center p-4 w-2/3 space-y-1'>
        <div className='text-base font-bold hover:text-blue-400'>{blogPost.headline}</div>
        <div className='text-gray-500 text-xs'>{blogPost.datePosted}</div>
      </div>
    </div>
    </Link>
  );
}

export default FeaturedBlogPostCard;
