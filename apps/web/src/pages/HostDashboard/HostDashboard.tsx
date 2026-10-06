import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock,
  IndianRupee,
  Plus,
  Star,
} from 'lucide-react';
import { Layout } from '../../components/layout';
import { Button, Card, Badge, Rating, VerificationBadge } from '../../components/ui';
import { Booking } from '../../types';

const img = (id: string, url: string) => ({ id, propertyId: id, url, createdAt: '' });

const mockBookings: Booking[] = [
  {
    id: 'b1',
    propertyId: '1',
    guestId: 'g1',
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
    guest: { id: 'g1', name: 'Anjali Gupta', email: 'anjali@example.com', phone: '+91 98765 43210' },
  },
  {
    id: 'b2',
    propertyId: '2',
    guestId: 'g2',
    checkIn: '2026-11-02',
    checkOut: '2026-11-06',
    guests: 4,
    totalAmount: 34000,
    status: 'PENDING',
    createdAt: '2026-09-25T10:00:00Z',
    updatedAt: '2026-09-25T10:00:00Z',
    property: {
      id: '2',
      title: 'Heritage Haveli Stay',
      city: 'Jaipur',
      locality: 'Civil Lines',
      images: [img('2', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=70')],
      host: { id: 'host1', name: 'Rajesh Sharma' },
    },
    guest: { id: 'g2', name: 'Vikram Mehta', email: 'vikram@example.com', phone: '+91 98765 43211' },
  },
  {
    id: 'b3',
    propertyId: '1',
    guestId: 'g3',
    checkIn: '2026-08-10',
    checkOut: '2026-08-15',
    guests: 1,
    totalAmount: 6000,
    status: 'COMPLETED',
    createdAt: '2026-07-15T10:00:00Z',
    updatedAt: '2026-08-15T10:00:00Z',
    property: {
      id: '1',
      title: 'Peaceful Family Stay',
      city: 'Sonipat',
      locality: 'Model Town',
      images: [img('1', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=70')],
      host: { id: 'host1', name: 'Rajesh Sharma' },
    },
    guest: { id: 'g3', name: 'Rahul Singh', email: 'rahul@example.com', phone: '+91 98765 43212' },
  },
];

const statusBadge: Record<string, { variant: 'verified' | 'amber' | 'terracotta' | 'neutral'; label: string }> = {
  PENDING: { variant: 'amber', label: 'New request' },
  CONFIRMED: { variant: 'verified', label: 'Confirmed' },
  COMPLETED: { variant: 'neutral', label: 'Completed' },
  CANCELLED: { variant: 'terracotta', label: 'Cancelled' },
};

export const HostDashboard = () => {
  const [tab, setTab] = useState<'requests' | 'properties' | 'earnings' | 'reviews'>('requests');

  const pending = mockBookings.filter((b) => b.status === 'PENDING');
  const confirmed = mockBookings.filter((b) => b.status === 'CONFIRMED');
  const completed = mockBookings.filter((b) => b.status === 'COMPLETED');
  const earnings = completed.reduce((s, b) => s + b.totalAmount, 0);

  const tabs = [
    { id: 'requests', label: 'Booking requests', count: pending.length },
    { id: 'properties', label: 'My properties', count: 3 },
    { id: 'earnings', label: 'Earnings', count: 0 },
    { id: 'reviews', label: 'Reviews', count: 2 },
  ] as const;

  return (
    <Layout>
      <div className="container-gs py-8 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="h2">Host dashboard</h1>
            <p className="lead mt-2 text-base">Welcome back, Rajesh. Here's how your listings are doing.</p>
          </div>
          <Link to="/host" className="btn-primary">
            <Plus className="h-4 w-4" aria-hidden="true" />
            New listing
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: 'Active listings', value: 3, icon: Building2 },
            { label: 'New requests', value: pending.length, icon: Clock },
            { label: 'Upcoming stays', value: confirmed.length, icon: CalendarDays },
            { label: 'Earned this year', value: `₹${earnings.toLocaleString('en-IN')}`, icon: IndianRupee },
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
          <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Host dashboard sections">
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

        <div className="mt-6">
          {/* Requests */}
          {tab === 'requests' && (
            <div className="space-y-4">
              {mockBookings.map((booking) => {
                const badge = statusBadge[booking.status];
                return (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="aspect-[16/10] w-full sm:aspect-auto sm:w-48 sm:shrink-0">
                        <img src={booking.property.images[0]?.url} alt={booking.property.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-neutral-900">{booking.property.title}</h3>
                            <p className="mt-0.5 text-sm text-neutral-500">
                              {booking.guest.name} · party of {booking.guests}
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
                          <span className="font-semibold text-neutral-900">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="mt-auto flex flex-wrap gap-2.5 pt-1">
                          {booking.status === 'PENDING' ? (
                            <>
                              <Button size="sm">Accept request</Button>
                              <Button variant="ghost" size="sm" className="text-terracotta-600 hover:bg-terracotta-50">
                                Decline
                              </Button>
                            </>
                          ) : (
                            <Button variant="secondary" size="sm">View details</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Properties */}
          {tab === 'properties' && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { id: '1', title: 'Peaceful Family Stay', city: 'Sonipat', locality: 'Model Town', price: 1200, rating: 4.8, reviews: 24, verified: true, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=70' },
                { id: '2', title: 'Heritage Haveli Stay', city: 'Jaipur', locality: 'Civil Lines', price: 8500, rating: 4.9, reviews: 12, verified: true, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=70' },
                { id: '7', title: 'Guest House Near Station', city: 'Jodhpur', locality: 'Station Road', price: 1500, rating: 0, reviews: 0, verified: false, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70' },
              ].map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="relative">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                      <img src={property.image} alt={property.title} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <span className="absolute left-3 top-3">
                      {property.verified ? (
                        <VerificationBadge className="bg-white/95 shadow-sm" />
                      ) : (
                        <Badge variant="amber">Pending review</Badge>
                      )}
                    </span>
                  </div>
                  <div className="space-y-1.5 p-4">
                    <h3 className="line-clamp-1 font-semibold text-neutral-900">{property.title}</h3>
                    <p className="text-sm text-neutral-500">{property.locality}, {property.city}</p>
                    <div className="flex items-center justify-between pt-1.5">
                      <span className="font-bold text-neutral-900">₹{property.price.toLocaleString('en-IN')}<span className="ml-1 text-xs font-medium text-neutral-400">/ night</span></span>
                      {property.rating > 0 ? <Rating value={property.rating} count={property.reviews} /> : <span className="text-xs text-neutral-400">No reviews yet</span>}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Link to={`/property/${property.id}`} className="btn-secondary btn-sm flex-1">View</Link>
                      <Button variant="ghost" size="sm" className="flex-1">Edit</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Earnings */}
          {tab === 'earnings' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Available for payout', value: earnings, tone: 'bg-primary-50 text-primary-800' },
                  { label: 'Upcoming payouts', value: confirmed.reduce((s, b) => s + b.totalAmount, 0), tone: 'bg-amber-50 text-amber-800' },
                  { label: 'Completed stays', value: completed.length, tone: 'bg-neutral-100 text-neutral-700', isCount: true },
                ].map((stat) => (
                  <Card key={stat.label} className={`p-6 ${stat.tone}`}>
                    <p className="text-sm">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold">
                      {stat.isCount ? stat.value : `₹${stat.value.toLocaleString('en-IN')}`}
                    </p>
                  </Card>
                ))}
              </div>
              <Card className="p-6">
                <h3 className="font-semibold text-neutral-900">Recent payouts</h3>
                <ul className="mt-4 divide-y divide-neutral-100">
                  {[
                    ['September 2026', 15000],
                    ['August 2026', 22000],
                    ['July 2026', 18500],
                  ].map(([month, amount]) => (
                    <li key={month} className="flex items-center justify-between gap-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-neutral-900">Payout · {month}</p>
                          <p className="text-xs text-neutral-400">Transferred to HDFC ••8842</p>
                        </div>
                      </div>
                      <span className="font-semibold text-neutral-900">₹{(amount as number).toLocaleString('en-IN')}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}

          {/* Reviews */}
          {tab === 'reviews' && (
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { name: 'Anjali Gupta', rating: 5, comment: 'Rajesh ji and his family made me feel at home. Clean room, quiet lane, and great chai in the morning.', stay: 'Peaceful Family Stay · Oct 2026' },
                { name: 'Meera Iyer', rating: 5, comment: "We hosted my sister's wedding guests here — the courtyard was the highlight. Spotless and well managed.", stay: 'Heritage Haveli Stay · Mar 2024' },
              ].map((review) => (
                <Card key={review.name} className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-neutral-900">{review.name}</p>
                    <span className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5`}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} aria-hidden="true" />
                      ))}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-400">{review.stay}</p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">“{review.comment}”</p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
