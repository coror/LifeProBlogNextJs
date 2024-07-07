import BlogPostPageComponent from '@/components/BlogPostPageComponent';

const BlogPostPage = ({ params: { locale } }) => {
  return (
    <div>
      <BlogPostPageComponent currentLocale={locale} />
    </div>
  );
};

export default BlogPostPage;
