export interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
  subCategories: SubCategory[];
  createdAt: string;
  updatedAt: string;
}