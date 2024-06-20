import date from 'date-and-time';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export const dateReducer = (dateStr) => {
  const dateObj = date.parse(dateStr.split('T')[0], 'YYYY-MM-DD');
  console.log(dateObj);
  return dateObj.toDateString();
};

export const richTextReducer = (rawRichText) => {
  const parsedRichText = documentToHtmlString(rawRichText);

  return parsedRichText;
};

export const imageReducer = (imageField) => {
  if (!imageField || !imageField.url) {
    return null;
  }
  return {
    url: imageField.original_secure_url,
    alt: imageField.alt || '',
    height: imageField.height,
    width: imageField.width,
    contentType: imageField.format,
  };
};

export const categoriesReducer = (rawBlogPosts) => {
  const categoriesSet = new Set();

  rawBlogPosts.forEach((rawBlogPost) => {
    if (rawBlogPost.fields.category) {
      categoriesSet.add(rawBlogPost.fields.category);
    }
  });

  return Array.from(categoriesSet);
};

export const blogPostReducer = (rawBlogPost) => {
  let blogPost = { ...rawBlogPost.fields };

  blogPost.id = rawBlogPost.sys.id;
  blogPost.locale = rawBlogPost.sys.locale;
  blogPost.datePosted = dateReducer(rawBlogPost.sys.createdAt);
  blogPost.image = imageReducer(rawBlogPost.fields.cloudinaryImage[0]);
  blogPost.content = richTextReducer(rawBlogPost.fields.content);
  blogPost.advice = richTextReducer(rawBlogPost.fields.advice);

  return blogPost;
};

export const truncateText = (htmlString, maxLength) => {
  const plainText = htmlString.replace(/<[^>]+>/g, ''); // Remove HTML tags
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength) + '...';
};
