import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { Rating, VerificationBadge, Badge } from '../ui';
import { PropertySearchResult } from '../../types';

const propertyTypeLabels: Record<string, string> = {
  ENTIRE_HOME: 'Entire home',
  PRIVATE_ROOM: 'Private room',
  SHARED_ROOM: 'Shared room',
  GUEST_HOUSE: 'Guest house',
  HOMESTAY: 'Homestay',
};

interface PropertyCardProps {
  property: PropertySearchResult;
  priority?: boolean;
}

export const PropertyCard = ({ property, priority = false }: PropertyCardProps) => {
  const image = property.images[0];
  const isVerified = property.verificationStatus === 'VERIFIED';

  return (
    <Link
      to={`/property/${property.id}`}
      className="card-hover group flex h-full flex-col overflow-hidden focus-visible:ring-2 focus-visible:ring-primary-500"
      aria-label={`${property.title} in ${property.city}`}
    >
      {/* Image — fixed aspect ratio, never overflows */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        {image ? (
          <img
            src={image}
            alt={property.title}
            loading={priority ? 'eager' : 'lazy'}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">No photo yet</div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2 pr-3">
          {isVerified && <VerificationBadge className="bg-white/95 shadow-sm backdrop-blur" />}
        </div>
        {property.averageRating > 0 && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-neutral-900 shadow-sm backdrop-blur">
            <Rating value={property.averageRating} count={property.reviewCount} />
          </span>
        )}
    </div>

      {/* Body — flex-1 keeps cards equal height in a row */}
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="shrink-0">{propertyTypeLabels[property.propertyType] ?? property.propertyType}</Badge>
        </div>

        <h3 className="line-clamp-1 text-base font-semibold text-neutral-900 transition-colors group-hover:text-primary-600">
          {property.title}
        </h3>

        <p className="flex items-center gap-1.5 text-sm text-neutral-500">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{property.locality}, {property.city}</span>
        </p>

        {/* Short description, clamped */}
        <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">
          {property.amenities.slice(0, 4).join(' · ')}
        </p>

        {/* Spacer pushes price row to bottom */}
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            <p className="text-lg font-bold text-neutral-900">
              ₹{property.pricePerNight.toLocaleString('en-IN')}
              <span className="ml-1 text-xs font-medium text-neutral-400">/ night</span>
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary-600 transition-transform group-hover:translate-x-0.5">
            View stay
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
};
