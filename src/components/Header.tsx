import React from 'react';
import { ShoppingCart, Home } from 'lucide-react';

interface HeaderProps {
  itemsCount: number;
  onToggleCart: () => void;
  showCart: boolean;
}

export const Header: React.FC<HeaderProps> = ({ itemsCount, onToggleCart, showCart }) => {
  return (
    <header className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-3 rounded-xl shadow-lg">
              <Home className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">MóveisCustom</h1>
              <p className="text-amber-100 text-sm">Móveis sob medida para você</p>
            </div>
          </div>
          
          <button
            onClick={onToggleCart}
            className="relative bg-white hover:bg-gray-50 text-amber-600 p-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 group"
          >
            <ShoppingCart size={24} />
            {itemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center animate-pulse">
                {itemsCount}
              </span>
            )}
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              {showCart ? 'Fechar Carrinho' : 'Ver Carrinho'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};