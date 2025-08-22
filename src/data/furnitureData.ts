import { Furniture } from '../types/furniture';

export const furnitureData: Furniture[] = [
  {
    id: '1',
    name: 'Mesa de Jantar',
    category: 'Mesa',
    basePrice: 800,
    image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Mesa de jantar em madeira maciça, ideal para 6 pessoas',
    defaultDimensions: { width: 180, height: 75, depth: 90 }
  },
  {
    id: '2',
    name: 'Guarda-roupa',
    category: 'Armário',
    basePrice: 1200,
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Guarda-roupa com 3 portas e gavetas internas',
    defaultDimensions: { width: 150, height: 220, depth: 60 }
  },
  {
    id: '3',
    name: 'Estante Livros',
    category: 'Estante',
    basePrice: 600,
    image: 'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Estante para livros com 5 prateleiras ajustáveis',
    defaultDimensions: { width: 80, height: 200, depth: 30 }
  },
  {
    id: '4',
    name: 'Mesa de Centro',
    category: 'Mesa',
    basePrice: 400,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Mesa de centro moderna com acabamento natural',
    defaultDimensions: { width: 120, height: 45, depth: 60 }
  },
  {
    id: '5',
    name: 'Cômoda',
    category: 'Cômoda',
    basePrice: 500,
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Cômoda com 4 gavetas e puxadores em metal',
    defaultDimensions: { width: 100, height: 80, depth: 45 }
  },
  {
    id: '6',
    name: 'Rack TV',
    category: 'Rack',
    basePrice: 350,
    image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Rack para TV até 55 polegadas com compartimentos',
    defaultDimensions: { width: 160, height: 50, depth: 35 }
  }
];