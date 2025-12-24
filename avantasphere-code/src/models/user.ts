export interface CatalogueUser {
  id: string;
  email: string;
  requestedAt: string;
  catalogueSentAt?: string;
  catalogueVersion?: string;
}