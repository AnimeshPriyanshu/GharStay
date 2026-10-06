import { FormEvent, useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Input, Select } from '../ui';
import { STAY_PURPOSES } from '../../constants';

interface SearchFormProps {
  initialValues?: {
    city?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    purpose?: string;
  };
  onSearch: (values: { city: string; checkIn: string; checkOut: string; guests: number; purpose: string }) => void;
  className?: string;
  compact?: boolean;
}

export const SearchForm = ({ initialValues = {}, onSearch, className = '', compact = false }: SearchFormProps) => {
  const [city, setCity] = useState(initialValues.city ?? '');
  const [checkIn, setCheckIn] = useState(initialValues.checkIn ?? '');
  const [checkOut, setCheckOut] = useState(initialValues.checkOut ?? '');
  const [guests, setGuests] = useState(String(initialValues.guests ?? 1));
  const [purpose, setPurpose] = useState(initialValues.purpose ?? '');

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch({ city: city.trim(), checkIn, checkOut, guests: Number(guests) || 1, purpose });
  };

  const guestOptions = Array.from({ length: 10 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} guest${i === 0 ? '' : 's'}`,
  }));

  if (compact) {
    return (
      <form
        onSubmit={handleSubmit}
        className={`card grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 lg:grid-cols-6 lg:items-end ${className}`}
        aria-label="Search stays"
      >
        <div className="col-span-2 lg:col-span-2">
          <label htmlFor="sf-where" className="label">Where are you going?</label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
            <Input
              id="sf-where"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City or locality"
              className="pl-9"
              required
            />
          </div>
        </div>
        <Input id="sf-in" type="date" label="Check-in" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} />
        <Input id="sf-out" type="date" label="Check-out" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} />
        <Select id="sf-guests" label="Guests" value={guests} onChange={(e) => setGuests(e.target.value)} options={guestOptions} aria-label="Guests" />
        <button type="submit" className="btn-primary h-[42px] w-full">
          <Search className="h-4 w-4" aria-hidden="true" />
          Search stays
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`card shadow-medium grid gap-4 p-4 sm:p-5 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end lg:gap-3 ${className}`}
      aria-label="Search stays"
    >
      <div>
        <label htmlFor="sf-city" className="label">Where are you going?</label>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
          <Input
            id="sf-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Try “Kota”, “Udaipur”, “Sonipat”…"
            className="pl-9"
            required
          />
        </div>
      </div>
      <Input id="sf-checkin" type="date" label="Check-in" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} />
      <Input id="sf-checkout" type="date" label="Check-out" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} />
      <Select id="sf-guests-lg" label="Guests" value={guests} onChange={(e) => setGuests(e.target.value)} options={guestOptions} aria-label="Guests" />
      <button type="submit" className="btn-primary h-[42px] px-6 lg:mb-0">
        <Search className="h-4 w-4" aria-hidden="true" />
        Search stays
      </button>
      {/* Purpose (optional) */}
      <div className="lg:col-span-5">
        <label htmlFor="sf-purpose" className="label">Purpose of stay <span className="font-normal text-neutral-400">(optional)</span></label>
        <Select
          id="sf-purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          options={[{ value: '', label: 'Any purpose' }, ...STAY_PURPOSES]}
          aria-label="Purpose of stay"
        />
      </div>
    </form>
  );
};
