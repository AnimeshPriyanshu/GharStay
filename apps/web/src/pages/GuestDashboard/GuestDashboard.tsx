import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BedDouble,
  CalendarDays,
  Heart,
  MapPin,
  Star,
  UserRound,
} from 'lucide-react';
import { Layout } from '../../components/layout';
import { Button, Card, EmptyState, Badge, Rating } from '../../components/ui';
import { Booking } from '../../types';
import { properties } from '../../data/properties';

const img = (id: string, url: string) => ({ id, propertyId: id, url, createdAt: '' });

const mockBookings: Booking[] = [
  {
    id: 'b1',
    propertyId: '1',
    guestId: 'guest1',
    checkIn: '2026-10-18',
    checkOut: '2026-10-21',
    guests: 2,
    totalAmount: 3600,
    status: 'CONFIRMED',
    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-09-20T10:00:00Z',
    property: {
      id: '1',
      title: 'Peaceful Family Stay',
      city: 'Sonipat',
      locality: 'Model Town',
      images: [img('1', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=70')],
      host: { id: 'host1', name: 'Rajesh Sharma' },
    },
    guest: { id: 'guest1', name: 'Anjali Gupta', email: 'anjali@example.com', phone: '+91 98765 43210' },
  },
  {
    id: 'b2',
    propertyId: '3',
    guestId: 'guest1',
    checkIn: '2026-11-02',
    checkOut: '2026-11-06',
    guests: 1,
    totalAmount: 4800,
    status: 'PENDING',
    createdAt: '2026-09-25T10:00:00Z',
    updatedAt: '2026-09-25T10:00:00Z',
    property: {
      id: '3',
      title: 'Room Near City Hospital',
      city: 'Jaipur',
      locality: 'C-Scheme',
      images: [img('3', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=70')],
      host: { id: 'host2', name: 'Priya Patel' },
    },
    guest: { id: 'guest1', name: 'Anjali Gupta', email: 'anjali@example.com', phone: '+91 98765 43210' },
  },
  {
    id: 'b3',
    propertyId: '4',
    guestId: 'guest1',
    checkIn: '2026-08-10',
    checkOut: '2026-08-15',
    guests: 2,
    totalAmount: 17500,
    status: 'COMPLETED',
    createdAt: '2026-07-15T10:00:00Z',
    updatedAt: '2026-08-15T10:00:00Z',
    property: {
      id: '4',
      title: 'Lake View Apartment',
      city: 'Udaipur',
      locality: 'Chandpole',
      images: [img('4', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=70')],
      host: { id: 'host2', name: 'Priya Patel' },
    },
    guest: { id: 'guest1', name: 'Anjali Gupta', email: 'anjali@example.com', phone: '+91 98765 43210' },
  },
];

const savedProperties = properties.slice(3, 6);

const statusBadge: Record<string, { variant: 'verified' | 'amber' | 'terracotta' | 'neutral'; label: string }> = {
  PENDING: { variant: 'amber', label: 'Awaiting host' },
  CONFIRMED: { variant: 'verified', label: 'Confirmed' },
  COMPLETED: { variant: 'neutral', label: 'Completed' },
  CANCELLED: { variant: 'terracotta', label: 'Cancelled' },
};

export const GuestDashboard = () => {
  const [tab, setTab] = useState<'upcoming' | 'past' | 'saved' | 'profile'>('upcoming');

  const upcoming = mockBookings.filter((b) => ['PENDING', 'CONFIRMED'].includes(b.status));
  const past = mockBookings.filter((b) => ['COMPLETED', 'CANCELLED'].includes(b.status));

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: upcoming.length },
    { id: 'past', label: 'Past stays', count: past.length },
    { id: 'saved', label: 'Saved', count: savedProperties.length },
    { id: 'profile', label: 'Profile', count: 0 },
  ] as const;

  return (
    <Layout>
      <div className="container-gs py-8 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="h2">My trips</h1>
            <p className="lead mt-2 text-base">Manage your bookings, saved stays and profile.</p>
          </div>
          <Link to="/explore" className="btn-primary">
            Find your next stay
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: 'Upcoming trips', value: upcoming.length, icon: CalendarDays },
            { label: 'Completed stays', value: past.filter((b) => b.status === 'COMPLETED').length, icon: BedDouble },
            { label: 'Saved stays', value: savedProperties.length, icon: Heart },
            { label: 'Guest rating', value: '4.8', icon: Star },
          ].map((stat) => (
            <Card key={stat.label} className="p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <stat.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-3 text-2xl font-bold text-neutral-900">{stat.value}</p>
              <p className="text-sm text-neutral-500">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-10 border-b border-neutral-200">
          <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Dashboard sections">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-current={tab === t.id ? 'page' : undefined}
                className={`shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  tab === t.id
                    ? 'border-primary-600 text-primary-700'
                    : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-800'
                }`}
              >
                {t.label}
                {t.count > 0 && (
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${tab === t.id ? 'bg-primary-100 text-primary-700' : 'bg-neutral-100 text-neutral-500'}`}>
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Panels */}
        <div className="mt-6">
          {tab === 'upcoming' && (
            upcoming.length ? (
              <div className="space-y-4">
                {upcoming.map((booking) => {
                  const badge = statusBadge[booking.status];
                  return (
                    <Card key={booking.id} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="aspect-[16/10] w-full sm:aspect-auto sm:w-48 sm:shrink-0">
                          <img
                            src={booking.property.images[0]?.url}
                            alt={booking.property.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h3 className="font-semibold text-neutral-900">{booking.property.title}</h3>
                              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-neutral-500">
                                <MapPin className="h-4 w-4" aria-hidden="true" />
                                {booking.property.locality}, {booking.property.city}
                              </p>
                            </div>
                            <Badge variant={badge.variant}>{badge.label}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600">
                            <span className="inline-flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-neutral-400" aria-hidden="true" />
                              {new Date(booking.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                              {' – '}
                              {new Date(booking.checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                            <span className="font-semibold text-neutral-900">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="mt-auto flex flex-wrap gap-2.5 pt-1">
                            <Button variant="secondary" size="sm">Message host</Button>
                            {booking.status === 'PENDING' || booking.status === 'CONFIRMED' ? (
                              <Button variant="ghost" size="sm" className="text-terracotta-600 hover:bg-terracotta-50">
                                Cancel booking
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon={<CalendarDays className="h-7 w-7" aria-hidden="true" />}
                title="No upcoming trips"
                description="When you request a stay, it will show up here with all the details."
                action={<Link to="/explore" className="btn-primary btn-sm">Explore stays</Link>}
              />
            )
          )}

          {tab === 'past' && (
            past.length ? (
              <div className="space-y-4">
                {past.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="aspect-[16/10] w-full sm:aspect-auto sm:w-48 sm:shrink-0">
                        <img
                          src={booking.property.images[0]?.url}
                          alt={booking.property.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold text-neutral-900">{booking.property.title}</h3>
                            <p className="mt-0.5 text-sm text-neutral-500">
                              Stayed in {new Date(booking.checkIn).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                            </p>
                          </div>
                          <Badge variant={statusBadge[booking.status].variant}>{statusBadge[booking.status].label}</Badge>
                        </div>
                        <div className="mt-auto flex flex-wrap gap-2.5 pt-2">
                          <Button variant="secondary" size="sm">
                            <Star className="h-3.5 w-3.5" aria-hidden="true" />
                            Write a review
                          </Button>
                          <Link to={`/property/${booking.propertyId}`} className="btn-ghost btn-sm">
                            View stay
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<BedDouble className="h-7 w-7" aria-hidden="true" />}
                title="No past stays yet"
                description="Your completed trips will appear here once you've stayed."
              />
            )
          )}

          {tab === 'saved' && (
            savedProperties.length ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {savedProperties.map((property) => (
                  <Card key={property.id} hover className="overflow-hidden">
                    <Link to={`/property/${property.id}`}>
                      <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                        <img
                          src={property.images[0]?.url}
                          alt={property.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                        />
                      </div>
                      <div className="space-y-1.5 p-4">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="line-clamp-1 font-semibold text-neutral-900">{property.title}</h3>
                          <Rating value={property.averageRating} />
                        </div>
                        <p className="flex items-center gap-1.5 text-sm text-neutral-500">
                          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span className="truncate">{property.locality}, {property.city}</span>
                        </p>
                        <p className="pt-1 text-sm font-bold text-neutral-900">
                          ₹{property.pricePerNight.toLocaleString('en-IN')}
                          <span className="ml-1 text-xs font-medium text-neutral-400">/ night</span>
                        </p>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Heart className="h-7 w-7" aria-hidden="true" />}
                title="Nothing saved yet"
                description="Tap the heart on any stay to keep it here for later."
                action={<Link to="/explore" className="btn-primary btn-sm">Explore stays</Link>}
              />
            )
          )}

          {tab === 'profile' && (
            <Card className="max-w-xl p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-800 text-xl font-bold text-white">
                  AG
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900">Anjali Gupta</h2>
                  <p className="text-sm text-neutral-500">Guest since June 2026</p>
                </div>
              </div>
              <dl className="mt-6 space-y-4 text-sm">
                {[
                  ['Email', 'anjali@example.com'],
                  ['Phone', '+91 98765 43210'],
                  ['City', 'Jaipur, Rajasthan'],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                    <dt className="text-neutral-500">{label}</dt>
                    <dd className="font-medium text-neutral-900">{value}</dd>
                  </div>
                ))}
              </dl>
              <Button variant="secondary" className="mt-6">
                <UserRound className="h-4 w-4" aria-hidden="true" />
                Edit profile
              </Button>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};
