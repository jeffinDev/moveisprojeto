import { useState } from 'react';
import { CartItem, Furniture } from '../types/furniture';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const calculatePrice = (furniture: Furniture, dimensions: { width: number; height: number; depth: number }) => {
    const baseArea = furniture.defaultDimensions.width * furniture.defaultDimensions.height * furniture.defaultDimensions.depth;
    const customArea = dimensions.width * dimensions.height * dimensions.depth;
    const multiplier = customArea / baseArea;
    return Math.round(furniture.basePrice * Math.max(multiplier, 0.5));
  };

  const addToCart = (furniture: Furniture) => {
    const existingItem = cartItems.find(item => item.id === furniture.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === furniture.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      const newItem: CartItem = {
        ...furniture,
        quantity: 1,
        customDimensions: { ...furniture.defaultDimensions },
        finalPrice: furniture.basePrice
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const updateItemDimensions = (id: string, dimensions: { width: number; height: number; depth: number }) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const furniture = { ...item, defaultDimensions: item.defaultDimensions };
        const newPrice = calculatePrice(furniture, dimensions);
        return {
          ...item,
          customDimensions: dimensions,
          finalPrice: newPrice
        };
      }
      return item;
    }));
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const updateItemObservations = (id: string, observations: string) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, observations } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.finalPrice * item.quantity), 0);
  };

  const getItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    updateItemDimensions,
    updateItemQuantity,
    updateItemObservations,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getItemsCount
  };
};