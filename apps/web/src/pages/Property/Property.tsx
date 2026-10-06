import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Bath,
  BedDouble,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Flame,
  Heart,
  MapPin,
  MessageCircle,
  Share2,
  ShieldCheck,
  Snowflake,
  Star,
  Tv,
  Users,
  Wifi,
  Wind,
  X,
} from 'lucide-react';
import { Layout } from '../../components/layout';
import { Button, Card, Input, Rating, Select, VerificationBadge, Badge } from '../../components/ui';
import { properties } from '../../data/properties';
import { PropertyImage } from '../../types';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const amenityIcons: Record<string, IconComponent> = {
  WiFi: Wifi,
  'Air Conditioning': Snowflake,
  Heating: Flame,
  Kitchen: UtensilsCrossed,
  Kitchenette: UtensilsCrossed,
  'Washing Machine': Wind,
  TV: Tv,
  Parking: Car,
  'Hot Water': Bath,
  Balcony: Sun,
  Garden: TreePalm,
  Workspace: Laptop,
  Essentials: CheckCircle2,
};

function UtensilsCrossed(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}
function Sun(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}
function TreePalm(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M13 8c0-3.5-2.5-5-5-5-1.7 0-3 .7-3 .7S7.4 5 8.5 6.5" />
      <path d="M13 8c0-3.5 2.5-5 5-5 1.7 0 3 .7 3 .7S18.6 5 17.5 6.5" />
      <path d="M13 8c1.5-1 3.5-1 5 0" />
      <path d="M13 8c-1.5-1-3.5-1-5 0" />
      <path d="M13 8v13" />
    </svg>
  );
}
function Laptop(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}

const propertyTypeLabels: Record<string, string> = {
  ENTIRE_HOME: 'Entire home',
  PRIVATE_ROOM: 'Private room',
  SHARED_ROOM: 'Shared room',
  GUEST_HOUSE: 'Guest house',
  HOMESTAY: 'Homestay',
};

const GALLERY_FALLBACK: PropertyImage[] = [
  { id: 'f1', propertyId: 'x', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=70', createdAt: '' },
  { id: 'f2', propertyId: 'x', url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=70', createdAt: '' },
  { id: 'f3', propertyId: 'x', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=70', createdAt: '' },
];

export const PropertyPage = () => {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === id);

  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // booking form state
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.round(diff / 86_400_000));
  }, [checkIn, checkOut]);

  if (!property) {
    return (
      <Layout>
        <div className="container-gs py-24 text-center">
          <h1 className="h2">Stay not found</h1>
          <p className="lead mx-auto mt-3 max-w-md">The stay you're looking for doesn't exist or may have been removed by its host.</p>
          <Link to="/explore" className="btn-primary mt-8">
            Browse all stays
          </Link>
        </div>
      </Layout>
    );
  }

  const images = property.images.length > 0 ? property.images : GALLERY_FALLBACK;
  const visibleAmenities = showAllAmenities ? property.amenities : property.amenities.slice(0, 8);
  const extraFee = 250;
  const subtotal = property.pricePerNight * (nights || 1);
  const total = subtotal + (nights ? extraFee : 0);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <nav className="container-gs flex items-center gap-2 py-3.5 text-sm text-neutral-500" aria-label="Breadcrumb">
          <Link to="/" className="transition-colors hover:text-primary-600">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/explore" className="transition-colors hover:text-primary-600">Stays</Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-neutral-800">{property.title}</span>
        </nav>
      </div>

      <div className="container-gs py-6 sm:py-8">
        {/* Title row */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="h2 min-w-0 break-words">{property.title}</h1>
              {property.verificationStatus === 'VERIFIED' && <VerificationBadge />}
            </div>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {property.locality}, {property.city}
              </span>
              <Rating value={property.averageRating} count={property.reviewCount} />
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4" aria-hidden="true" />
                Up to {property.maxGuests} guests
              </span>
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="secondary" size="sm">
              <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
              Share
            </Button>
            <Button variant="secondary" size="sm">
              <Heart className="h-3.5 w-3.5" aria-hidden="true" />
              Save
            </Button>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-6 grid gap-3 overflow-hidden rounded-2xl md:grid-cols-2 md:gap-2">
          <button
            type="button"
            onClick={() => setLightbox(0)}
            className="group relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 md:aspect-auto md:h-[26rem]"
            aria-label="Open photo gallery"
          >
            <img
              src={images[0].url}
              alt={property.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </button>
          <div className="grid grid-cols-2 gap-3 md:gap-2">
            {images.slice(1, 5).map((image, i) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setLightbox(i + 1)}
                className="group relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 md:aspect-auto"
                aria-label={`Open photo ${i + 2}`}
              >
                <img
                  src={image.url}
                  alt={`${property.title} photo ${i + 2}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {i === 3 && images.length > 5 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-neutral-900/50 text-sm font-semibold text-white">
                    +{images.length - 5} more
                  </span>
                )}
              </button>
            ))}
            {images.length === 2 && (
              <div className="hidden aspect-[4/3] md:block md:aspect-auto" />
            )}
          </div>
        </div>

        {/* Main content + booking rail */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* LEFT */}
          <div className="min-w-0 space-y-10">
            {/* Summary strip */}
            <div className="flex flex-wrap gap-2.5">
              <Badge variant="outline">{propertyTypeLabels[property.propertyType] ?? property.propertyType}</Badge>
              <Badge variant="outline">
                <BedDouble className="h-3.5 w-3.5" aria-hidden="true" /> {property.bedrooms} bedroom{property.bedrooms > 1 ? 's' : ''}
              </Badge>
              <Badge variant="outline">
                <BedDouble className="h-3.5 w-3.5" aria-hidden="true" /> {property.bedsCount} bed{property.bedsCount > 1 ? 's' : ''}
              </Badge>
              <Badge variant="outline">
                <Bath className="h-3.5 w-3.5" aria-hidden="true" /> {property.bathrooms} bathroom{property.bathrooms > 1 ? 's' : ''}
              </Badge>
            </div>

            {/* Description */}
            <section aria-labelledby="about-stay">
              <h2 id="about-stay" className="h3">About this stay</h2>
              <p className="mt-3 leading-relaxed text-neutral-600">{property.description}</p>
            </section>

            {/* Amenities */}
            <section aria-labelledby="amenities">
              <h2 id="amenities" className="h3">What this place offers</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {visibleAmenities.map((amenity) => {
                  const Icon = amenityIcons[amenity.name] ?? CheckCircle2;
                  return (
                    <div key={amenity.id} className="flex items-center gap-3 rounded-xl border border-neutral-200 px-4 py-3">
                      <Icon className="h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
                      <span className="text-sm text-neutral-700">{amenity.name}</span>
                    </div>
                  );
                })}
              </div>
              {property.amenities.length > 8 && (
                <Button variant="ghost" size="sm" className="mt-3" onClick={() => setShowAllAmenities((v) => !v)}>
                  {showAllAmenities ? (
                    <>
                      Show less <ChevronUp className="h-4 w-4" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      Show all {property.amenities.length} amenities <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </Button>
              )}
            </section>

            {/* Location */}
            <section aria-labelledby="location">
              <h2 id="location" className="h3">Where you'll stay</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
                <MapPin className="h-4 w-4 text-primary-600" aria-hidden="true" />
                {property.address}
              </p>
              <div className="mt-4 flex h-52 items-center justify-center rounded-2xl border border-neutral-200 bg-cream-100 text-sm text-neutral-500">
                Exact location shared after booking
              </div>
            </section>

            {/* Host */}
            <section aria-labelledby="host">
              <h2 id="host" className="h3">Meet your host</h2>
              <Card className="mt-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-800 text-lg font-bold text-white">
                      {property.host.name.charAt(0)}
                    </span>
                    <div>
                      <p className="font-semibold text-neutral-900">{property.host.name}</p>
                      <p className="text-sm text-neutral-500">Hosting since {property.hostSince}</p>
                    </div>
                  </div>
                  {property.verificationStatus === 'VERIFIED' && <VerificationBadge className="shrink-0" />}
                </div>
                <div className="mt-5 grid gap-2 border-t border-neutral-100 pt-5 text-sm text-neutral-600 sm:grid-cols-2">
                  <p className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-primary-600" aria-hidden="true" />
                    Responds {property.responseTime}
                  </p>
                  <p className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary-600" aria-hidden="true" />
                    Identity verified
                  </p>
                </div>
              </Card>
            </section>

            {/* Reviews */}
            <section aria-labelledby="reviews">
              <div className="flex items-center justify-between gap-4">
                <h2 id="reviews" className="h3">
                  Guest reviews
                  <span className="ml-2 align-middle text-base font-normal text-neutral-400">({property.reviewCount})</span>
                </h2>
              </div>
              {property.reviews.length > 0 ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {property.reviews.map((review) => (
                    <Card key={review.id} className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                            {review.guest?.name?.charAt(0) ?? 'G'}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-neutral-900">{review.guest?.name ?? 'Guest'}</p>
                            <p className="text-xs text-neutral-400">
                              {new Date(review.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <span className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5`}>
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`}
                              aria-hidden="true"
                            />
                          ))}
                        </span>
                      </div>
                      {review.comment && <p className="mt-3 text-sm leading-relaxed text-neutral-600">“{review.comment}”</p>}
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-6 text-sm text-neutral-500">
                  This stay is new to GharStay and hasn't received reviews yet. Be the first to stay and share your experience.
                </p>
              )}
            </section>
          </div>

          {/* RIGHT — booking card */}
          <aside>
            <Card className="p-6 lg:sticky lg:top-24">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold text-neutral-900">₹{property.pricePerNight.toLocaleString('en-IN')}</span>
                <span className="text-sm text-neutral-500">/ night</span>
              </div>

              <form
                className="mt-5 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  // booking request would be sent here
                }}
              >
                <div className="grid grid-cols-2 gap-3">
                  <Input id="prop-in" type="date" label="Check-in" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} />
                  <Input id="prop-out" type="date" label="Check-out" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} />
                </div>
                <Select
                  id="prop-guests"
                  label="Guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  options={Array.from({ length: property.maxGuests }, (_, i) => ({
                    value: String(i + 1),
                    label: `${i + 1} guest${i === 0 ? '' : 's'}`,
                  }))}
                />

                <div className="space-y-2 rounded-xl bg-neutral-50 p-4 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>
                      ₹{property.pricePerNight.toLocaleString('en-IN')} × {nights || 1} night{nights === 1 ? '' : 's'}
                    </span>
                    <span className="font-medium text-neutral-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Service fee</span>
                    <span className="font-medium text-neutral-900">{nights ? `₹${extraFee}` : '—'}</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-200 pt-2 font-semibold text-neutral-900">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Button type="submit" fullWidth size="lg">
                  Request booking
                </Button>
                <p className="text-center text-xs text-neutral-400">You won't be charged yet</p>
              </form>

              <ul className="mt-5 space-y-2.5 border-t border-neutral-100 pt-5 text-sm text-neutral-600">
                {['Free cancellation before check-in', 'Verified home & host', 'Local support during your stay'].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 p-4 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
            aria-label="Close photo viewer"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length));
            }}
            className="absolute left-3 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img
            src={images[lightbox].url}
            alt={`${property.title} photo ${lightbox + 1}`}
            className="max-h-[85vh] max-w-[92vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? null : (i + 1) % images.length));
            }}
            className="absolute right-3 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
            {lightbox + 1} / {images.length}
          </span>
        </div>
      )}
    </Layout>
  );
};
