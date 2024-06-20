import date from 'date-and-time';

// Define types for the fields
interface ImageField {
  fields: {
    file: {
      url: string;
      details: {
        image: {
          height: number;
          width: number;
        };
      };
      contentType: string;
    };
    title: string;
  };
}

export interface RawBlogPost {
  sys: {
    id: string;
    locale: string;
    createdAt: string;
  };
  fields: {
    image: ImageField;
    [key: string]: any; // For other possible fields
  };
}

export interface BlogPost {
  id: string;
  locale: string;
  datePosted: string;
  image: {
    url: string;
    alt: string;
    height: number;
    width: number;
    contentType: string;
  };
  [key: string]: any; // For other possible fields
}

// Type for the dateReducer function
export const dateReducer = (dateStr: string): string => {
  const dateObj = date.parse(dateStr.split('T')[0], 'YYYY-MM-DD');
  console.log(dateObj);
  return dateObj.toDateString();
};

// Type for the imageReducer function
export const imageReducer = (imageField: ImageField) => {
  return {
    url: `https:${imageField.fields.file.url}`,
    alt: imageField.fields.title,
    height: imageField.fields.file.details.image.height,
    width: imageField.fields.file.details.image.width,
    contentType: imageField.fields.file.contentType,
  };
};

// Type for the blogPostReducer function
export const blogPostReducer = (rawBlogPost: RawBlogPost): BlogPost => {
  // Spread rawBlogPost fields and extract necessary fields for BlogPost
  const { image, ...restFields } = rawBlogPost.fields;

  const blogPost: BlogPost = {
    ...restFields, // Include other fields dynamically
    id: rawBlogPost.sys.id,
    locale: rawBlogPost.sys.locale,
    datePosted: dateReducer(rawBlogPost.sys.createdAt),
    image: imageReducer(image),
  };

  return blogPost;
};
