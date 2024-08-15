// types.ts
export interface Product {
    id: number;
    productName: string;
    description: string;
    productPrice: number;
    imageUrl: string;
    bulk: boolean;  // Se o produto é de peso ou não
    quantidade: number | null;
    peso?: number;  // Opcional, para produtos a granel
  }
  
  export interface Category {
    id: number;
    categoryName: string;
  }
  