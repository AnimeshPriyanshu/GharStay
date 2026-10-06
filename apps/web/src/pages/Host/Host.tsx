import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BadgeCheck,
  Building2,
  CalendarCheck,
  ChevronDown,
  HandCoins,
  IndianRupee,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Layout } from '../../components/layout';
import { SectionHeading } from '../../components/ui';

const benefits = [
  {
    icon: HandCoins,
    title: 'Earn from unused space',
    description: 'A spare room, an empty floor, a guest house — list it once and let it work for you.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified guests only',
    description: 'Every guest has a verified profile and phone number before they can request a stay.',
  },
  {
    icon: Users,
    title: 'Support when you need it',
    description: "Our hyperlocal network helps with anything during a guest's stay — you're never on your own.",
  },
  {
    icon: CalendarCheck,
    title: 'You set the rules',
    description: 'Choose check-in windows, house rules, and when your space is available.',
  },
];

const hostingSteps = [
  { number: '01', title: 'List your space', description: 'Add photos, set your price, and describe what makes your place comfortable. Takes about 10 minutes.' },
  { number: '02', title: 'Get verified', description: 'Our team checks the property and your details. The verified badge builds guest trust.' },
  { number: '03', title: 'Welcome guests', description: 'Accept the requests you like, chat with guests, and host on your schedule.' },
  { number: '04', title: 'Get paid', description: 'Payouts go straight to your bank account after each completed stay.' },
];

const verificationPoints = [
  { title: 'Host identity check', description: 'Government ID and phone verification for every host.' },
  { title: 'Property visit or video walk-through', description: 'We confirm photos, address and living conditions before listing.' },
  { title: 'Safety essentials', description: 'Lock on the door, hot water, first-aid kit — checked at onboarding.' },
  { title: 'Ongoing reviews', description: 'Guest reviews keep quality high long after the first listing.' },
];

const faqs = [
  {
    q: 'How much can I earn?',
    a: 'It depends on your city and space. Hosts in Tier-2 cities typically earn ₹8,000–₹25,000 a month listing a spare room a few nights a week. You set the nightly price and see estimated earnings before you publish.',
  },
  {
    q: 'Does it cost anything to list?',
    a: 'No. Listing is free. GharStay takes a small service fee only when you complete a paid booking — so we earn when you earn.',
  },
  {
    q: 'Is it safe to welcome strangers?',
    a: 'Guests verify their identity and phone number before booking. You can review each guest profile, chat before accepting, and decline any request. Our local partners can assist during any stay.',
  },
  {
    q: 'What does verification involve?',
    a: 'A short call or visit from our team, plus photos of the space, address confirmation, and safety checks. Most verifications finish within 2–3 days.',
  },
  {
    q: 'Can I host only on certain dates?',
    a: 'Yes — your calendar is fully in your control. Mark dates available or blocked anytime, for any reason.',
  },
];

export const HostPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream-100">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-100/60 blur-3xl" />
        <div className="container-gs relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20 lg:gap-14">
          <div className="max-w-xl">
            <span className="eyebrow mb-5">
              <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
              For hosts
            </span>
            <h1 className="h1 text-balance">
              Your spare room can <span className="text-primary-500">welcome the world.</span>
            </h1>
            <p className="lead mt-5 max-w-lg">
              Turn an unused room or floor into steady income — while giving travellers a trusted place to stay in your city.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="btn-primary btn-lg">
                List your property
              </Link>
              <a href="#host-faq" className="btn-secondary btn-lg">
                Learn how it works
              </a>
            </div>
            <p className="mt-5 text-sm text-neutral-500">
              Free to list · Verified guests · Support from local partners
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-3xl border border-neutral-200 shadow-medium">
              <div className="aspect-[4/3] w-full">
                <img
                  src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=900&q=70"
                  alt="A comfortable guest room prepared for visitors"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
            <div className="card mt-4 flex items-center gap-3 p-4 shadow-medium sm:absolute sm:-bottom-6 sm:left-6 sm:mt-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <IndianRupee className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-900">₹8,000–₹25,000 / month</p>
                <p className="text-xs text-neutral-500">Typical for a spare room in a Tier-2 city</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container-gs">
          <SectionHeading
            eyebrow="Why host with us"
            title="Hosting that respects your time and your home"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <b.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-neutral-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How hosting works */}
      <section className="section bg-neutral-50">
        <div className="container-gs">
          <SectionHeading eyebrow="How hosting works" title="From spare room to first guest in four steps" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {hostingSteps.map((step) => (
              <div key={step.number} className="card p-6">
                <span className="text-3xl font-extrabold text-primary-200" aria-hidden="true">{step.number}</span>
                <h3 className="mt-3 text-base font-semibold text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification */}
      <section className="section">
        <div className="container-gs">
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="eyebrow mb-4">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Verification
              </span>
              <h2 className="h2 text-balance">The verified badge guests look for</h2>
              <p className="lead mt-4">
                Verified homes get booked more — guests tell us trust is the number one reason they pick a stay. Here's how we get you there.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-cream-100 p-4">
                <TrendingUp className="h-8 w-8 shrink-0 text-primary-600" aria-hidden="true" />
                <p className="text-sm text-neutral-700">
                  Verified listings receive <strong>up to 3× more booking requests</strong> than unverified ones.
                </p>
              </div>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {verificationPoints.map((point, i) => (
                <li key={point.title} className="card p-5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-neutral-900">{point.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{point.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Earnings */}
      <section className="section bg-cream-100">
        <div className="container-gs">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="eyebrow mb-4">
                <IndianRupee className="h-3.5 w-3.5" aria-hidden="true" />
                Earnings
              </span>
              <h2 className="h2 text-balance">What could your space earn?</h2>
              <p className="lead mt-4">
                Set your own nightly rate. GharStay takes a small service fee only on completed bookings — everything else is yours.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ['₹800', 'Budget room, per night'],
                  ['₹1,800', 'Private room, per night'],
                  ['₹3,500+', 'Entire home, per night'],
                ].map(([value, label]) => (
                  <div key={label} className="card p-4 text-center">
                    <p className="text-xl font-bold text-primary-700">{value}</p>
                    <p className="mt-1 text-xs text-neutral-500">{label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-neutral-500">Typical nightly rates on GharStay across our cities.</p>
            </div>
            <div className="card p-6 sm:p-8">
              <h3 className="text-base font-semibold text-neutral-900">Example: spare room in Kota</h3>
              <dl className="mt-5 space-y-3 text-sm">
                {[
                  ['20 nights booked', '₹24,000'],
                  ['GharStay service fee', '− ₹2,400'],
                  ['Paid to your bank account', '₹21,600'],
                ].map(([label, value], i) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3 ${
                      i === 2 ? 'bg-primary-50 font-semibold text-primary-800' : 'bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <Link to="/register" className="btn-primary mt-6 w-full">
                Start earning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="host-faq">
        <div className="container-gs">
          <SectionHeading eyebrow="FAQ" title="Questions hosts ask us" />
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.q} className="card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  >
                    <span className="text-sm font-semibold text-neutral-900 sm:text-base">{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div id={`faq-panel-${i}`} className="px-5 pb-5 sm:px-6">
                      <p className="text-sm leading-relaxed text-neutral-600">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container-gs">
          <div className="rounded-3xl bg-primary-800 px-6 py-12 text-center sm:px-10 sm:py-16">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Ready to welcome your first guest?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-base">
              Listing takes about ten minutes. Verification usually finishes within a couple of days. Your first booking could be closer than you think.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/register" className="btn-primary btn-lg bg-white text-primary-800 hover:bg-cream-100">
                List your property
              </Link>
              <a href="#host-faq" className="btn-lg btn-terracotta">
                Read the FAQ again
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
