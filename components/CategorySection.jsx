import React from 'react';

import { useTranslation } from 'react-i18next';

const CategorySection = ({ categories, onCategoryClick }) => {
  const { t } = useTranslation();

  return (
    <div className='sticky top-20 h-full border-2 lg:m-0 p-4 min-w-[12rem] shadow-lg rounded-md m-auto'>
      <p className='mb-6 font-bold'>{t('filter_category')}</p>
      {categories.map((category) => (
        <div
          className='m-1 hover:text-blue-400 cursor-pointer font-semibold'
          key={category}
          onClick={() => onCategoryClick(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
