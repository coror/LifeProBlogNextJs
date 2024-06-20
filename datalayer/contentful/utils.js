import date from 'date-and-time';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { createClient } from 'contentful-management';

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

export const fetchPredefinedCategories = async () => {
  const managementClient = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN, 
  });

  try {
    const space = await managementClient.getSpace(
      process.env.CONTENTFUL_SPACE_ID
    );
    const environment = await space.getEnvironment('master'); 
    const contentType = await environment.getContentType('blogPost'); 

    const categoryField = contentType.fields.find(
      (field) => field.id === 'category'
    ); 

    if (!categoryField) {
      throw new Error('Category field not found in the blogPost content type');
    }
    const categories = categoryField.validations[0].in; 

    return categories;
  } catch (error) {
    console.error('Error fetching predefined categories:', error.message);
    throw new Error('Failed to fetch predefined categories from content model');
  }
};
