import { client } from './client';
// import { categoryReducer } from './utils';

export const getCategories = async (language = 'en-US') => {
  try {
    const categories = await client.getEntries({
      content_type: 'category',
      locale: language,
    });
    // console.log(categories.items);
    return categories.items;
  } catch (error) {
    console.log(`Error fetching categories for ${language}`, error);
    return [];
  }
};

// export const getCategoriesNames = async () => {
//   const rawNames = await client.getEntries({
//     content_type: 'category',
//     select: ['fields.name'],
//   });
//   const names = rawNames.items.map((rawName) => rawName.fields.name);
//   return names;
// };

// export const getCategoryByName = async ({ name }) => {
//   const found = await client.getEntries({
//     content_type: 'category',
//     'fields.name': name,
//   });

//   if (found.items.length == 0) return null;

//   const category = found.items[0];
//   return categoryReducer(category);
// };
