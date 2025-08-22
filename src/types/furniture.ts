export interface Furniture {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  image: string;
  description: string;
  defaultDimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

export interface CartItem extends Furniture {
  quantity: number;
  customDimensions: {
    width: number;
    height: number;
    depth: number;
  };
  finalPrice: number;
  observations?: string;
}