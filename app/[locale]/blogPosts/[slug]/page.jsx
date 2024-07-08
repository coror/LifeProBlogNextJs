import BlogPostPageComponent from '@/components/BlogPostPageComponent';

const BlogPostPage = ({ params: { locale, slug } }) => {
  return (
    <div>
      <BlogPostPageComponent currentLocale={locale} slug={slug} />
    </div>
  );
};

export default BlogPostPage;
