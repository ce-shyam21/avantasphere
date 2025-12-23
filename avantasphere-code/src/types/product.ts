export interface Product {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  subCategoryId: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  thumbnailImage: string;
  specifications: Record<string, string | number>;
  pricing: {
    cost: number;
    currency: string;
    moq: number;
    showPrice: boolean;
  };
  shipping: {
    weight: number;
    port: string;
    shippingCost: number;
    shippingTime: string;
    incoterms: string;
  };
  customs: {
    hsCode: string;
    country: string;
  };
  visibility: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}