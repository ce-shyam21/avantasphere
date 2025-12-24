export interface ProductSpecifications {
  [key: string]: string | number;
}

export interface ProductPricing {
  cost: number;
  currency: string;
  moq: number;
  showPrice: boolean;
}

export interface ProductShipping {
  weight: number;
  port: string;
  shippingCost: number;
  shippingTime: string;
  incoterms: string;
}

export interface ProductCustoms {
  hsCode: string;
  country: string;
}

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
  specifications: ProductSpecifications;
  pricing: ProductPricing;
  shipping: ProductShipping;
  customs: ProductCustoms;
  visibility: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}