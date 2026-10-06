import { useState } from 'react';
import { Car, Clock, HandHeart, MapPin, Phone, Users } from 'lucide-react';
import { Layout } from '../../components/layout';
import { Button, Card, Badge, EmptyState } from '../../components/ui';

interface AssistanceRequest {
  id: string;
  guestName: string;
  city: string;
  locality: string;
  purpose: string;
  guests: number;
  nights: number;
  status: 'ACTIVE' | 'COMPLETED' | 'EXPIRED';
  phone: string;
}

const mockRequests: AssistanceRequest[] = [
  {
    id: 'r1',
    guestName: 'Rohit Verma',
    city: 'Kota',
    locality: 'Talwandi',
    purpose: 'Exam',
    guests: 1,
    nights: 3,
    status: 'ACTIVE',
    phone: '+91 98765 11111',
  },
  {
    id: 'r2',
    guestName: 'Sunita Rao',
    city: 'Jaipur',
    locality: 'Near SMS Hospital',
    purpose: 'Hospital visit',
    guests: 2,
    nights: 4,
    status: 'ACTIVE',
    phone: '+91 98765 22222',
  },
  {
    id: 'r3',
    guestName: 'Arjun Desai',
    city: 'Varanasi',
    locality: 'Assi Ghat',
    purpose: 'Unexpected travel',
    guests: 1,
    nights: 1,
    status: 'COMPLETED',
    phone: '+91 98765 33333',
  },
];

const statusBadge: Record<AssistanceRequest['status'], { variant: 'amber' | 'verified' | 'neutral'; label: string }> = {
  ACTIVE: { variant: 'amber', label: 'Needs help' },
  COMPLETED: { variant: 'verified', label: 'Completed' },
  EXPIRED: { variant: 'neutral', label: 'Expired' },
};

export const PartnerDashboard = () => {
  const [tab, setTab] = useState<'active' | 'completed'>('active');
  const active = mockRequests.filter((r) => r.status === 'ACTIVE');
  const completed = mockRequests.filter((r) => r.status === 'COMPLETED');

  return (
    <Layout>
      <div className="container-gs py-8 sm:py-10">
        <div className="max-w-xl">
          <h1 className="h2">Partner dashboard</h1>
          <p className="lead mt-2 text-base">
            Travellers nearby need someone who knows the city. Here's who's waiting.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: 'Open requests', value: active.length, icon: HandHeart },
            { label: 'Guests helped', value: 24, icon: Users },
            { label: 'Cities covered', value: 3, icon: MapPin },
            { label: 'Avg. response', value: '38 min', icon: Clock },
          ].map((stat) => (
            <Card key={stat.label} className="p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta-50 text-terracotta-600">
                <stat.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-3 text-2xl font-bold text-neutral-900">{stat.value}</p>
              <p className="text-sm text-neutral-500">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 border-b border-neutral-200">
          <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Partner sections">
            {(
              [
                { id: 'active', label: 'Active requests', count: active.length },
                { id: 'completed', label: 'Completed', count: completed.length },
              ] as const
            ).map((t) => (
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

        <div className="mt-6 space-y-4">
          {(tab === 'active' ? active : completed).map((req) => (
            <Card key={req.id} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-semibold text-neutral-900">{req.guestName}</h3>
                    <Badge variant={statusBadge[req.status].variant}>{statusBadge[req.status].label}</Badge>
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500">
                    <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {req.locality}, {req.city}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-neutral-600">
                    <span>Reason: {req.purpose}</span>
                    <span>{req.guests} guest{req.guests > 1 ? 's' : ''}</span>
                    <span>{req.nights} night{req.nights > 1 ? 's' : ''}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a href={`tel:${req.phone.replace(/\s/g, '')}`} className="btn-secondary btn-sm">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    Call guest
                  </a>
                  {req.status === 'ACTIVE' ? (
                    <Button size="sm">Mark helped</Button>
                  ) : (
                    <Button variant="ghost" size="sm">View details</Button>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {(tab === 'active' ? active : completed).length === 0 && (
            <EmptyState
              icon={<Car className="h-7 w-7" aria-hidden="true" />}
              title={tab === 'active' ? 'No open requests right now' : 'Nothing completed yet'}
              description={
                tab === 'active'
                  ? 'When a traveller nearby asks for help, the request will show up here.'
                  : 'Requests you help complete will be listed here.'
              }
            />
          )}
        </div>
      </div>
    </Layout>
  );
};
