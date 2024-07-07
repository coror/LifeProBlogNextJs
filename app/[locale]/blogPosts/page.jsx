import BlogPostPageListComponent from '@/components/BlogPostPageListComponent';

const BlogPostsPage = ({ params: { locale } }) => {
  return <BlogPostPageListComponent currentLocale={locale} />;
};

export default BlogPostsPage;
