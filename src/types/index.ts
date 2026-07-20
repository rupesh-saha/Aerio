export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  specs: {
    coverageSqFt: number;
    noiseLevelDb: number;
    filterType: string;
  };
}
