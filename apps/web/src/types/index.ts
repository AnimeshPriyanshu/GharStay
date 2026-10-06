export interface Property {
  id: string;
  title: string;
  description: string;
  city: string;
  locality: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  pricePerNight: number;
  propertyType: string;
  status: string;
  verificationStatus: string;
  createdAt: string;
  updatedAt: string;
  images: PropertyImage[];
  amenities: Amenity[];
  host: {
    id: string;
    name: string;
    phone: string;
    createdAt: string;
  };
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
  availableDates: string[];
}

export interface PropertyImage {
  id: string;
  propertyId: string;
  url: string;
  createdAt: string;
}

export interface Amenity {
  id: string;
  name: string;
}

export interface PropertySearchResult {
  id: string;
  title: string;
  city: string;
  locality: string;
  pricePerNight: number;
  propertyType: string;
  verificationStatus: string;
  averageRating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  hostName: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  property: {
    id: string;
    title: string;
    city: string;
    locality: string;
    images: PropertyImage[];
    host: { id: string; name: string };
  };
  guest: { id: string; name: string; email: string; phone: string };
}

export interface Review {
  id: string;
  propertyId: string;
  guestId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  guest?: { id: string; name: string };
}

export interface EmergencyRequest {
  id: string;
  guestId: string | null;
  city: string;
  locality: string;
  purpose: string;
  description: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  guest?: { id: string; name: string; phone: string; email: string };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SearchFilters {
  city?: string;
  locality?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  purpose?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
}