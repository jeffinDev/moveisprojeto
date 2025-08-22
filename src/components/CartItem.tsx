import React from 'react';
import { Minus, Plus, Trash2, Ruler, Edit3 } from 'lucide-react';
import { CartItem as CartItemType } from '../types/furniture';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onUpdateDimensions: (id: string, dimensions: { width: number; height: number; depth: number }) => void;
  onUpdateObservations: (id: string, observations: string) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity, 
  onUpdateDimensions, 
  onUpdateObservations, 
  onRemove 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 space-y-6 border border-gray-100">
      <div className="flex items-start gap-6">
        <div className="relative group">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-28 h-28 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
        </div>
        
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {item.category}
              </span>
            </div>
            
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
            >
              <Trash2 size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">Quantidade:</span>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="bg-white hover:bg-gray-100 rounded-full p-2 transition-colors shadow-sm"
                disabled={item.quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="font-bold text-lg min-w-[2rem] text-center">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="bg-white hover:bg-gray-100 rounded-full p-2 transition-colors shadow-sm"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">
              R$ {(item.finalPrice * item.quantity).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              R$ {item.finalPrice.toFixed(2)} × {item.quantity}
            </p>
          </div>
        </div>
      </div>

      {/* Custom Dimensions */}
      <div className="border-t border-gray-100 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Ruler className="text-blue-600" size={20} />
          <h4 className="font-bold text-gray-800">Medidas Personalizadas</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Largura (cm)
            </label>
            <input
              type="number"
              value={item.customDimensions.width}
              onChange={(e) => onUpdateDimensions(item.id, {
                ...item.customDimensions,
                width: Number(e.target.value)
              })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Altura (cm)
            </label>
            <input
              type="number"
              value={item.customDimensions.height}
              onChange={(e) => onUpdateDimensions(item.id, {
                ...item.customDimensions,
                height: Number(e.target.value)
              })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profundidade (cm)
            </label>
            <input
              type="number"
              value={item.customDimensions.depth}
              onChange={(e) => onUpdateDimensions(item.id, {
                ...item.customDimensions,
                depth: Number(e.target.value)
              })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              min="1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Edit3 size={16} className="text-gray-600" />
            <label className="text-sm font-medium text-gray-700">
              Observações para o marceneiro
            </label>
          </div>
          <textarea
            value={item.observations || ''}
            onChange={(e) => onUpdateObservations(item.id, e.target.value)}
            placeholder="Ex: Acabamento especial, cor da madeira, detalhes específicos..."
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};