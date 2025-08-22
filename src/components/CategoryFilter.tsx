import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtrar por categoria</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'bg-amber-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-gray-200'
          }`}
        >
          Todos
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-amber-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};