import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Car,
  Church,
  GraduationCap,
  HandCoins,
  Heart,
  HeartHandshake,
  Home,
  MapPin,
  ShieldCheck,
  Siren,
  Smile,
  Sparkles,
  Stethoscope,
  Store,
  Users,
  Zap,
} from 'lucide-react';
import { Layout } from '../../components/layout';
import { SearchForm } from '../../components/common';
import { PropertyCard } from '../../components/property';
import { SectionHeading, VerificationBadge } from '../../components/ui';
import { STAY_PURPOSES } from '../../constants';
import { searchResults } from '../../data/properties';

const purposes = STAY_PURPOSES.map((p) => ({
  ...p,
  icon: {
    TOURISM: MapPin,
    HOSPITAL_VISIT: Stethoscope,
    EMERGENCY: Zap,
    EXAM: GraduationCap,
    WEDDING: Heart,
    PILGRIMAGE: Church,
    BUSINESS: Briefcase,
    FAMILY_VISIT: Smile,
    OTHER: Home,
  }[p.value] ?? MapPin,
}));

const trustPoints = [
  {
    icon: ShieldCheck,
    title: 'Verified homes',
    description: 'Properties and hosts are verified before being listed — photos checked, addresses confirmed, details on record.',
  },
  {
    icon: HandCoins,
    title: 'Affordable stays',
    description: 'Comfortable local accommodation without unnecessary hotel costs. Fair prices, no hidden fees.',
  },
  {
    icon: HeartHandshake,
    title: 'Local assistance',
    description: 'Get help from trusted people who actually know the city — from directions to check-in support.',
  },
  {
    icon: Zap,
    title: 'Quick booking',
    description: 'Find and request a stay in minutes. No endless searching, no waiting days for a reply.',
  },
];

const howItWorks = [
  { number: '01', title: 'Search', description: "Tell us where you're going and what you need." },
  { number: '02', title: 'Choose a verified stay', description: 'Compare location, price, amenities and verification details.' },
  { number: '03', title: 'Stay with confidence', description: 'Book your stay and get local support when you need it.' },
];

const networkMembers = [
  { icon: Car, label: 'Auto drivers' },
  { icon: Store, label: 'Shopkeepers' },
  { icon: Building2, label: 'Local businesses' },
  { icon: Users, label: 'Community members' },
  { icon: BadgeCheck, label: 'Local representatives' },
];

const popularStays = searchResults.filter((p) => p.verificationStatus === 'VERIFIED').slice(0, 4);

export const HomePage = () => {
  const handleSearch = (values: { city: string; checkIn: string; checkOut: string; guests: number; purpose: string }) => {
    const params = new URLSearchParams();
    params.set('city', values.city);
    if (values.checkIn) params.set('checkIn', values.checkIn);
    if (values.checkOut) params.set('checkOut', values.checkOut);
    if (values.guests) params.set('guests', String(values.guests));
    if (values.purpose) params.set('purpose', values.purpose);
    window.location.href = `/explore?${params.toString()}`;
  };

  return (
    <Layout>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-cream-100">
        {/* decorative only */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-100/60 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-amber-100/50 blur-3xl" />

        <div className="container-gs relative py-12 sm:py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            {/* Left — copy */}
            <div className="max-w-xl">
              <span className="eyebrow mb-5">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Verified local stays
              </span>
              <h1 className="h1 text-balance">
                Find a place you can trust, <span className="text-primary-500">wherever you go.</span>
              </h1>
              <p className="lead mt-5 max-w-lg">
                Verified local stays in Tier-2 and Tier-3 cities — for planned trips, unexpected journeys, and everything in between.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/explore" className="btn-primary btn-lg">
                  Explore stays
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link to="/emergency" className="btn-terracotta btn-lg">
                  <Siren className="h-4 w-4" aria-hidden="true" />
                  Need a place tonight?
                </Link>
              </div>

              {/* trust strip */}
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-neutral-200 pt-6">
                {[
                  ['500+', 'Verified homes'],
                  ['40+', 'Cities covered'],
                  ['4.8★', 'Guest rating'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="sr-only">{label}</dt>
                    <dd className="text-2xl font-bold text-neutral-900">{value}</dd>
                    <dd className="mt-0.5 text-xs font-medium text-neutral-500">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right — visual composition */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-medium">
                <div className="aspect-[4/3] w-full">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=70"
                    alt="A welcoming verified homestay in an Indian town"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>

              {/* floating card: verified */}
              <div className="card mt-4 flex items-center gap-3 p-4 shadow-medium sm:absolute sm:-left-6 sm:top-8 sm:mt-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Every home verified</p>
                  <p className="text-xs text-neutral-500">Before it's ever listed</p>
                </div>
              </div>

              {/* floating card: rating */}
              <div className="card mt-3 flex items-center gap-3 p-4 shadow-medium sm:absolute sm:-right-4 sm:bottom-10 sm:mt-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">4.8 from guests</p>
                  <p className="text-xs text-neutral-500">Across 10,000+ stays</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SEARCH CARD ============ */}
      <section className="container-gs relative z-10 -mt-6 sm:-mt-8">
        <SearchForm onSearch={handleSearch} className="rounded-2xl" />
      </section>

      {/* ============ PURPOSES ============ */}
      <section className="section">
        <div className="container-gs">
          <SectionHeading
            eyebrow="Every reason to travel"
            title="What brings you to town?"
            description="From weddings to ward rounds — tell us why you're travelling and we'll show you stays that fit."
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4 xl:grid-cols-4">
            {purposes.map((purpose) => (
              <Link
                key={purpose.value}
                to={`/explore?purpose=${purpose.value}`}
                className="card-hover group flex flex-col items-center gap-2.5 px-3 py-5 text-center"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
                  <purpose.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-neutral-800 group-hover:text-primary-700">{purpose.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ POPULAR STAYS ============ */}
      <section className="section bg-neutral-50">
        <div className="container-gs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Popular right now"
              title="Stays guests keep coming back to"
            />
            <Link to="/explore" className="btn-outline shrink-0 self-start sm:self-auto">
              View all stays
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {popularStays.map((property, i) => (
              <PropertyCard key={property.id} property={property} priority={i < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY GHARSTAY ============ */}
      <section className="section">
        <div className="container-gs">
          <SectionHeading
            eyebrow="Why GharStay"
            title="Built on trust, priced for real life"
            description="A staying experience designed for people visiting a city they don't know yet."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <div key={point.title} className="card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <point.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-neutral-900">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EMERGENCY ============ */}
      <section className="section">
        <div className="container-gs">
          <div className="relative overflow-hidden rounded-3xl bg-primary-900">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-terracotta-500/20 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" />

            <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:p-14">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-terracotta-300">
                  <Siren className="h-3.5 w-3.5" aria-hidden="true" />
                  Emergency stay
                </span>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Need a place tonight?
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-300 sm:text-base">
                  Don't know the city? Tell us where you are and what you need. We'll help you find a nearby verified stay — calmly, quickly, and without judgement.
                </p>
                <div className="mt-7">
                  <Link to="/emergency" className="btn-terracotta btn-lg">
                    Find an urgent stay
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Guest → Local partner → Verified stay */}
              <ol className="grid gap-3 sm:grid-cols-3 lg:gap-2">
                {[
                  { icon: Users, step: '1', label: 'You tell us', sub: 'Where you are & what you need' },
                  { icon: Car, step: '2', label: 'Local partner', sub: 'Alerts nearby verified hosts' },
                  { icon: Home, step: '3', label: 'Verified stay', sub: 'Confirmed within hours' },
                ].map((item, i) => (
                  <li key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-terracotta-500/20 text-terracotta-300">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-white">{item.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-400">{item.sub}</p>
                    {i < 2 && <span className="sr-only">, then</span>}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="section bg-neutral-50" id="how-it-works">
        <div className="container-gs">
          <SectionHeading eyebrow="How it works" title="Three steps to a stay you can trust" />
          <div className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-8">
            {howItWorks.map((step) => (
              <div key={step.number} className="card relative p-6 sm:p-8">
                <span className="text-4xl font-extrabold tracking-tight text-primary-200" aria-hidden="true">{step.number}</span>
                <h3 className="mt-3 text-lg font-semibold text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BECOME A HOST ============ */}
      <section className="section">
        <div className="container-gs">
          <div className="grid items-center gap-8 rounded-3xl bg-cream-200 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:p-14">
            <div>
              <span className="eyebrow mb-4 bg-white/70">
                <Home className="h-3.5 w-3.5" aria-hidden="true" />
                Become a host
              </span>
              <h2 className="h2 text-balance">Have an unused room?</h2>
              <p className="lead mt-3 max-w-md">
                Turn your spare room or floor into a source of income while helping travellers find a trusted place to stay.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/host" className="btn-primary btn-lg">
                  Become a host
                </Link>
                <Link to="/host" className="btn-secondary btn-lg">
                  Learn how it works
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <div className="aspect-[4/3] w-full">
                <img
                  src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=70"
                  alt="A bright spare room ready to welcome guests"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LOCAL NETWORK ============ */}
      <section className="section bg-cream-100">
        <div className="container-gs">
          <SectionHeading
            eyebrow="The hyperlocal network"
            title="People who know the city can help people who don't."
            description="GharStay is more than an app — it's a network of neighbours who make every stay feel local."
          />
          <div className="mt-10 flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
            {networkMembers.map((member) => (
              <div key={member.label} className="card flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <member.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-neutral-800">{member.label}</span>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 flex max-w-md items-center justify-center">
            <VerificationBadge label="Every partner is identity-verified before joining" className="justify-center px-4 py-2.5 text-sm" />
          </div>
        </div>
      </section>
    </Layout>
  );
};
