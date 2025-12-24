export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  productId?: string;
  productName?: string;
  message: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: string;
  respondedAt?: string;
  adminNotes?: string;
}