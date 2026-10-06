import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { SearchForm } from '../../components/common';
import { PropertyCard } from '../../components/property';
import { Button, Input, Select, EmptyState } from '../../components/ui';
import { SlidersHorizontal, X } from 'lucide-react';
import { PROPERTY_TYPES, PRICE_RANGE } from '../../constants';
import { searchResults } from '../../data/properties';

type SortValue = 'newest' | 'price-asc' | 'price-desc' | 'rating-desc';

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating-desc', label: 'Highest rated' },
];

const emptyFilters = {
  minPrice: PRICE_RANGE.min,
  maxPrice: PRICE_RANGE.max,
  propertyType: '',
  verifiedOnly: false,
  minRating: 0,
};

interface FilterState {
  minPrice: number;
  maxPrice: number;
  propertyType: string;
  verifiedOnly: boolean;
  minRating: number;
}

const FilterPanel = ({
  filters,
  onChange,
  onClear,
}: {
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  onClear: () => void;
}) => (
  <div className="space-y-7">
    {/* Price */}
    <div>
      <h3 className="text-sm font-semibold text-neutral-900">Price per night</h3>
      <div className="mt-3 flex items-center gap-2">
        <Input
          type="number"
          aria-label="Minimum price"
          value={filters.minPrice}
          min={PRICE_RANGE.min}
          max={filters.maxPrice}
          onChange={(e) => onChange({ minPrice: Number(e.target.value) || PRICE_RANGE.min })}
        />
        <span className="text-neutral-400">–</span>
        <Input
          type="number"
          aria-label="Maximum price"
          value={filters.maxPrice}
          min={filters.minPrice}
          max={PRICE_RANGE.max}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) || PRICE_RANGE.max })}
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {[
          [800, 1500],
          [1500, 3000],
          [3000, 6000],
          [6000, PRICE_RANGE.max],
        ].map(([lo, hi]) => (
          <button
            key={`${lo}-${hi}`}
            onClick={() => onChange({ minPrice: lo, maxPrice: hi })}
            className="badge-neutral transition-colors hover:bg-primary-50 hover:text-primary-700"
          >
            ₹{lo.toLocaleString('en-IN')}–₹{hi.toLocaleString('en-IN')}
          </button>
        ))}
      </div>
    </div>

    {/* Property type */}
    <div>
      <h3 className="text-sm font-semibold text-neutral-900">Property type</h3>
      <div className="mt-3 space-y-2">
        <label className="flex items-center gap-2.5 text-sm text-neutral-700">
          <input
            type="radio"
            name="propertyType"
            checked={filters.propertyType === ''}
            onChange={() => onChange({ propertyType: '' })}
            className="h-4 w-4 accent-primary-600"
          />
          Any type
        </label>
        {PROPERTY_TYPES.map((t) => (
          <label key={t.value} className="flex items-center gap-2.5 text-sm text-neutral-700">
            <input
              type="radio"
              name="propertyType"
              checked={filters.propertyType === t.value}
              onChange={() => onChange({ propertyType: t.value })}
              className="h-4 w-4 accent-primary-600"
            />
            {t.label}
          </label>
        ))}
      </div>
    </div>

    {/* Verification */}
    <div>
      <h3 className="text-sm font-semibold text-neutral-900">Verification</h3>
      <label className="mt-3 flex items-center gap-2.5 text-sm text-neutral-700">
        <input
          type="checkbox"
          checked={filters.verifiedOnly}
          onChange={(e) => onChange({ verifiedOnly: e.target.checked })}
          className="h-4 w-4 accent-primary-600"
        />
        Verified homes only
      </label>
    </div>

    {/* Rating */}
    <div>
      <h3 className="text-sm font-semibold text-neutral-900">Minimum rating</h3>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {[0, 4, 4.5].map((r) => (
          <button
            key={r}
            onClick={() => onChange({ minRating: r })}
            className={`badge ${filters.minRating === r ? 'bg-primary-600 text-white' : 'badge-neutral hover:bg-primary-50 hover:text-primary-700'}`}
          >
            {r === 0 ? 'Any' : `${r}+ ★`}
          </button>
        ))}
      </div>
    </div>

    <Button variant="secondary" size="sm" fullWidth onClick={onClear}>
      Clear all filters
    </Button>
  </div>
);

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const city = searchParams.get('city') ?? '';
  const purpose = searchParams.get('purpose') ?? '';
  const checkIn = searchParams.get('checkIn') ?? '';
  const checkOut = searchParams.get('checkOut') ?? '';

  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sort, setSort] = useState<SortValue>('newest');

  // Close drawer on escape
  useEffect(() => {
    if (!showFilters) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setShowFilters(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [showFilters]);

  const handleSearch = useCallback(
    (values: { city: string; checkIn: string; checkOut: string; guests: number; purpose: string }) => {
      const params = new URLSearchParams();
      params.set('city', values.city);
      if (values.checkIn) params.set('checkIn', values.checkIn);
      if (values.checkOut) params.set('checkOut', values.checkOut);
      if (values.guests) params.set('guests', String(values.guests));
      if (values.purpose) params.set('purpose', values.purpose);
      setSearchParams(params);
    },
    [setSearchParams]
  );

  const results = useMemo(() => {
    let list = searchResults.filter((p) => {
      if (city && !`${p.city} ${p.locality}`.toLowerCase().includes(city.toLowerCase())) return false;
      if (p.pricePerNight < filters.minPrice || p.pricePerNight > filters.maxPrice) return false;
      if (filters.propertyType && p.propertyType !== filters.propertyType) return false;
      if (filters.verifiedOnly && p.verificationStatus !== 'VERIFIED') return false;
      if (filters.minRating && p.averageRating < filters.minRating) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.pricePerNight - b.pricePerNight;
        case 'price-desc':
          return b.pricePerNight - a.pricePerNight;
        case 'rating-desc':
          return b.averageRating - a.averageRating;
        default:
          return 0;
      }
    });
    return list;
  }, [city, filters, sort]);

  const activeFilterCount = [
    filters.minPrice > PRICE_RANGE.min,
    filters.maxPrice < PRICE_RANGE.max,
    Boolean(filters.propertyType),
    filters.verifiedOnly,
    filters.minRating > 0,
  ].filter(Boolean).length;

  return (
    <Layout>
      {/* Search bar */}
      <div className="border-b border-neutral-200 bg-cream-50">
        <div className="container-gs py-6">
          <SearchForm
            compact
            initialValues={{ city, checkIn, checkOut, guests: 1, purpose }}
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="container-gs py-8">
        {/* Results header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
              {results.length} {results.length === 1 ? 'stay' : 'stays'} found
              {city && (
                <span className="font-normal text-neutral-500"> in {city}</span>
              )}
            </h1>
            {purpose && <p className="mt-1 text-sm text-neutral-500">Filtered by purpose: {purpose.toLowerCase().replace(/_/g, ' ')}</p>}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button variant="secondary" size="sm" className="lg:hidden" onClick={() => setShowFilters(true)}>
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary-600 px-1 text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            <div className="w-full sm:w-48">
              <Select
                aria-label="Sort results"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortValue)}
                options={SORT_OPTIONS}
              />
            </div>
          </div>
        </div>

        {/* Body: sidebar + grid */}
        <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 card p-5">
              <h2 className="mb-5 text-base font-semibold text-neutral-900">Filters</h2>
              <FilterPanel
                filters={filters}
                onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
                onClear={() => setFilters(emptyFilters)}
              />
            </div>
          </aside>

          {/* Results */}
          <div>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
                {results.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No stays match your filters"
                description="Try widening your price range or removing a filter to see more options."
                action={
                  <Button variant="outline" size="sm" onClick={() => setFilters(emptyFilters)}>
                    Clear all filters
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div
            className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white shadow-large animate-slide-in-left">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
              <h2 className="text-base font-semibold text-neutral-900">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <FilterPanel
                filters={filters}
                onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
                onClear={() => setFilters(emptyFilters)}
              />
            </div>
            <div className="border-t border-neutral-200 p-4">
              <Button fullWidth onClick={() => setShowFilters(false)}>
                Show {results.length} {results.length === 1 ? 'stay' : 'stays'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

