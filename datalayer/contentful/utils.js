import { format, parseISO } from 'date-fns';
import { de, enUS } from 'date-fns/locale';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const locales = { 'en-US': enUS, de: de };

export const dateReducer = (dateStr, locale = 'en-US') => {
  const dateObj = parseISO(dateStr);
  const formatLocale = locales[locale];
  return format(dateObj, 'PPP', { locale: formatLocale });
};

export const richTextReducer = (rawRichText) => {
  return documentToHtmlString(rawRichText);
};

export const imageReducer = (imageField) => {
  if (!imageField || !imageField.url) {
    return null;
  }
  return {
    url: imageField.url,
    alt: imageField.alt || '',
    height: imageField.height,
    width: imageField.width,
    contentType: imageField.contentType,
  };
};

export const blogPostReducer = (rawBlogPost, locale = 'en-US') => {
  let blogPost = { ...rawBlogPost.fields };

  blogPost.id = rawBlogPost.sys.id;
  blogPost.locale = rawBlogPost.sys.locale || locale;
  blogPost.datePosted = dateReducer(rawBlogPost.sys.createdAt, blogPost.locale);
  blogPost.image = imageReducer(rawBlogPost.fields.cloudinaryImage[0]);
  blogPost.content = richTextReducer(rawBlogPost.fields.content);
  blogPost.advice = richTextReducer(rawBlogPost.fields.advice);
  blogPost.categories =
    rawBlogPost.fields.categories?.map((category) => category.fields.name) ||
    [];

  return blogPost;
};

export const truncateText = (htmlString, maxLength) => {
  const plainText = htmlString.replace(/<[^>]+>/g, ''); // Remove HTML tags
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength) + '...';
};
