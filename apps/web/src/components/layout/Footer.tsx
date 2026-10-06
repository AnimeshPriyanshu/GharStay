import { Link } from 'react-router-dom';
import { Home, Mail, MapPin } from 'lucide-react';

const columns = [
  {
    title: 'GharStay',
    links: [
      { label: 'About', to: '/host' },
      { label: 'How it works', to: '/#how-it-works' },
      { label: 'Become a host', to: '/host' },
    ],
  },
  {
    title: 'Guests',
    links: [
      { label: 'Explore stays', to: '/explore' },
      { label: 'Emergency stay', to: '/emergency' },
      { label: 'Help', to: '/emergency' },
    ],
  },
  {
    title: 'Hosts',
    links: [
      { label: 'List your property', to: '/host' },
      { label: 'Host guidelines', to: '/host' },
      { label: 'Verification', to: '/host' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/host' },
      { label: 'Contact', to: '/emergency' },
      { label: 'Privacy', to: '/host' },
      { label: 'Terms', to: '/host' },
    ],
  },
];

const socials = ['Facebook', 'Instagram', 'X', 'YouTube'];

export const Footer = () => {
  return (
    <footer className="mt-auto bg-primary-900 text-neutral-300" role="contentinfo">
      <div className="container-gs py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2" aria-label="GharStay home">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
                <Home className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold text-white">
                Ghar<span className="text-amber-300">Stay</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
              A trusted place to stay, even when you don't know the city. Verified local homes across Tier-2 and Tier-3 India.
            </p>
            <div className="mt-5 space-y-2 text-sm text-neutral-400">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href="mailto:hello@gharstay.in" className="transition-colors hover:text-white">
                  hello@gharstay.in
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                Made in India
              </p>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-neutral-300 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-neutral-400">© {new Date().getFullYear()} GharStay. All rights reserved.</p>
          <p className="text-sm text-neutral-400">Trusted stays, wherever you need them.</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          {socials.map((s) => (
            <a
              key={s}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-neutral-400 transition-colors hover:border-white/25 hover:text-white"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
