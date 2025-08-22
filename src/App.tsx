import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { FurnitureCard } from './components/FurnitureCard';
import { CartItem } from './components/CartItem';
import { CustomerForm } from './components/CustomerForm';
import { CategoryFilter } from './components/CategoryFilter';
import { furnitureData } from './data/furnitureData';
import { useCart } from './hooks/useCart';
import { generatePDF } from './utils/pdfGenerator';
import { ShoppingBag, Package, Sparkles } from 'lucide-react';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const {
    cartItems,
    addToCart,
    updateItemDimensions,
    updateItemQuantity,
    updateItemObservations,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getItemsCount
  } = useCart();

  const categories = useMemo(() => {
    return Array.from(new Set(furnitureData.map(item => item.category)));
  }, []);

  const filteredFurniture = useMemo(() => {
    if (selectedCategory === 'all') {
      return furnitureData;
    }
    return furnitureData.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleGeneratePDF = (customerInfo: any) => {
    generatePDF(cartItems, customerInfo);
    clearCart();
    setShowCart(false);
    alert('PDF gerado com sucesso! Verifique sua pasta de downloads.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      <Header 
        itemsCount={getItemsCount()} 
        onToggleCart={() => setShowCart(!showCart)}
        showCart={showCart}
      />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-yellow-300" size={32} />
            <h2 className="text-5xl font-bold text-white">Móveis Sob Medida</h2>
            <Sparkles className="text-yellow-300" size={32} />
          </div>
          <p className="text-xl text-amber-100 mb-8">
            Personalize as medidas, gere especificações técnicas e tenha seus móveis únicos
          </p>
          <div className="flex items-center justify-center gap-8 text-amber-100">
            <div className="text-center">
              <Package size={24} className="mx-auto mb-2" />
              <p className="text-sm">Catálogo Completo</p>
            </div>
            <div className="w-px h-12 bg-amber-300"></div>
            <div className="text-center">
              <ShoppingBag size={24} className="mx-auto mb-2" />
              <p className="text-sm">Medidas Personalizadas</p>
            </div>
            <div className="w-px h-12 bg-amber-300"></div>
            <div className="text-center">
              <Sparkles size={24} className="mx-auto mb-2" />
              <p className="text-sm">PDF para Marceneiro</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {!showCart ? (
          <>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFurniture.map(furniture => (
                <FurnitureCard
                  key={furniture.id}
                  furniture={furniture}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Seu Carrinho</h2>
              <p className="text-gray-600">Personalize as medidas dos seus móveis</p>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag size={64} className="text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-500 mb-4">Seu carrinho está vazio</p>
                <button
                  onClick={() => setShowCart(false)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {cartItems.map(item => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateItemQuantity}
                      onUpdateDimensions={updateItemDimensions}
                      onUpdateObservations={updateItemObservations}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border border-green-200">
                  <div className="text-center mb-4">
                    <p className="text-3xl font-bold text-green-700">
                      Total: R$ {getTotalPrice().toFixed(2)}
                    </p>
                    <p className="text-green-600">
                      {getItemsCount()} {getItemsCount() === 1 ? 'item' : 'itens'} no carrinho
                    </p>
                  </div>

                  <CustomerForm onSubmit={handleGeneratePDF} />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">MóveisCustom</h3>
          <p className="text-gray-400 mb-6">
            Transformando suas ideias em móveis únicos e personalizados
          </p>
          <div className="flex items-center justify-center gap-8 text-gray-400">
            <p>📐 Medidas Personalizadas</p>
            <p>📄 Especificações Técnicas</p>
            <p>🛠️ Para Marceneiros</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;