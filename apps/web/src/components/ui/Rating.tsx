import { Star, ShieldCheck } from 'lucide-react';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export const Rating = ({ value, count, size = 'sm', className = '' }: RatingProps) => (
  <span className={`inline-flex items-center gap-1 ${className}`} aria-label={`Rated ${value} out of 5${count ? ` by ${count} guests` : ''}`}>
    <Star className={`${sizeMap[size]} fill-amber-400 text-amber-400`} aria-hidden="true" />
    <span className="font-semibold text-neutral-900">{value.toFixed(1)}</span>
    {count !== undefined && <span className="text-neutral-400">({count})</span>}
  </span>
);

export const VerificationBadge = ({ label = 'Verified', className = '' }: { label?: string; className?: string }) => (
  <span className={`badge-verified ${className}`}>
    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
    {label}
  </span>
);
