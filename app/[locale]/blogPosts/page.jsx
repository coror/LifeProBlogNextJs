import BlogPostPageComponent from '@/components/BlogPostPageComponent';

const BlogPostsPage = ({ params: { locale } }) => {
  return <BlogPostPageComponent currentLocale={locale} />;
};

export default BlogPostsPage;
