import React from 'react';
import { ShoppingCart, Ruler } from 'lucide-react';
import { Furniture } from '../types/furniture';

interface FurnitureCardProps {
  furniture: Furniture;
  onAddToCart: (furniture: Furniture) => void;
}

export const FurnitureCard: React.FC<FurnitureCardProps> = ({ furniture, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={furniture.image} 
          alt={furniture.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
          {furniture.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{furniture.name}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{furniture.description}</p>
        
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <Ruler size={16} />
          <span>
            {furniture.defaultDimensions.width} x {furniture.defaultDimensions.height} x {furniture.defaultDimensions.depth} cm
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-green-600">
              R$ {furniture.basePrice.toFixed(2)}
            </span>
            <p className="text-xs text-gray-500">medidas padrão</p>
          </div>
          
          <button
            onClick={() => onAddToCart(furniture)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 font-medium"
          >
            <ShoppingCart size={18} />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};