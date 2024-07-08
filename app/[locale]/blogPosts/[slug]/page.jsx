import BlogPostPageComponent from '@/components/BlogPostPageComponent';

import { fetchBlogPost, fetchBlogPosts } from '@/utils/request';

// OR I COULD MAKE BLOGPOSTPAGE COMPONENT, AND PASTE THAT COMPONENT IN PAGE.JSX

export async function generateStaticParams() {
  const blogPosts = await fetchBlogPosts();
  const slugs = blogPosts.map(({ slug }) => slug);
  return slugs.map((slug) => ({ slug }));
  // return slugs.map((slug) => ({ slug }.slice(0, 5))); // if you have 1000 pages, only first 5 are prerendered. other will be saved in cache after the first user opens it
}

export async function generateMetadata({ params }) {
  const { slug, locale } = params;
  const blogPost = await fetchBlogPost(slug, locale);

  if (!blogPost) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  return {
    title: `LifePlus | ${blogPost.seoTitle}`,
    description: blogPost.seoDescription || 'Read this amazing blog post.',
    openGraph: {
      title: `LifePlus | ${blogPost.seoTitle}`,
      description: blogPost.seoDescription || 'Read this amazing blog post.',
      images: [
        {
          url: blogPost.image.url,
          width: 800,
          height: 600,
          alt: blogPost.title,
        },
      ],
    },
  };
}

const BlogPostPage = () => {
  return (
    <div>
      <BlogPostPageComponent  />
    </div>
  );
};

export default BlogPostPage;
