import React from 'react';

const CategorySection = ({ categories, onCategoryClick }) => {
  return (
    <div className='sticky top-20 h-full border-2 lg:m-0 p-4 min-w-[12rem] shadow-lg rounded-md m-auto'>
      <p className='mb-6 font-bold'>Filter by categories:</p>
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
