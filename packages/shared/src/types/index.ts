export enum UserRole {
  GUEST = 'GUEST',
  HOST = 'HOST',
  ADMIN = 'ADMIN',
  LOCAL_PARTNER = 'LOCAL_PARTNER',
}

export enum PropertyType {
  ENTIRE_HOME = 'ENTIRE_HOME',
  PRIVATE_ROOM = 'PRIVATE_ROOM',
  SHARED_ROOM = 'SHARED_ROOM',
  GUEST_HOUSE = 'GUEST_HOUSE',
  HOMESTAY = 'HOMESTAY',
}

export enum PropertyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
}

export enum VerificationStatus {
  UNVERIFIED = 'UNVERIFIED',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  CHECKED_IN = 'CHECKED_IN',
  CHECKED_OUT = 'CHECKED_OUT',
}

export enum EmergencyStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  FULFILLED = 'FULFILLED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export enum EmergencyReason {
  HOSPITAL = 'HOSPITAL',
  FAMILY_EMERGENCY = 'FAMILY_EMERGENCY',
  UNEXPECTED_TRAVEL = 'UNEXPECTED_TRAVEL',
  OTHER = 'OTHER',
}

export enum StayPurpose {
  TOURISM = 'TOURISM',
  HOSPITAL_VISIT = 'HOSPITAL_VISIT',
  EMERGENCY = 'EMERGENCY',
  EXAM = 'EXAM',
  WEDDING = 'WEDDING',
  PILGRIMAGE = 'PILGRIMAGE',
  BUSINESS = 'BUSINESS',
  FAMILY_VISIT = 'FAMILY_VISIT',
  OTHER = 'OTHER',
}

export enum LocalPartnerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Property {
  id: string;
  hostId: string;
  title: string;
  description: string;
  city: string;
  locality: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  pricePerNight: number;
  propertyType: PropertyType;
  status: PropertyStatus;
  verificationStatus: VerificationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyImage {
  id: string;
  propertyId: string;
  url: string;
  createdAt: Date;
}

export interface Amenity {
  id: string;
  name: string;
}

export interface PropertyAmenity {
  propertyId: string;
  amenityId: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  guestId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalAmount: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  propertyId: string;
  guestId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
}

export interface LocalPartner {
  id: string;
  userId: string;
  area: string;
  status: LocalPartnerStatus;
  createdAt: Date;
}

export interface EmergencyRequest {
  id: string;
  guestId: string | null;
  city: string;
  locality: string;
  purpose: EmergencyReason;
  description: string | null;
  status: EmergencyStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PropertyFilters {
  city?: string;
  locality?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  purpose?: StayPurpose;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: PropertyType;
  sortBy?: 'price' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PropertySearchResult {
  id: string;
  title: string;
  city: string;
  locality: string;
  pricePerNight: number;
  propertyType: PropertyType;
  verificationStatus: VerificationStatus;
  averageRating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  hostName: string;
}

export interface PropertyDetail extends Property {
  images: PropertyImage[];
  amenities: Amenity[];
  host: Pick<User, 'id' | 'name' | 'phone' | 'createdAt'>;
  reviews: (Review & { guest: Pick<User, 'id' | 'name'> })[];
  averageRating: number;
  reviewCount: number;
  availableDates: string[];
}

export interface CreatePropertyInput {
  title: string;
  description: string;
  city: string;
  locality: string;
  address: string;
  latitude?: number;
  longitude?: number;
  pricePerNight: number;
  propertyType: PropertyType;
  amenityIds: string[];
  images: string[];
}

export interface CreateBookingInput {
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
}

export interface CreateReviewInput {
  propertyId: string;
  rating: number;
  comment?: string;
}

export interface CreateEmergencyRequestInput {
  city: string;
  locality: string;
  purpose: EmergencyReason;
  description?: string;
  guests: number;
  requiredNights: number;
  phoneNumber: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
}