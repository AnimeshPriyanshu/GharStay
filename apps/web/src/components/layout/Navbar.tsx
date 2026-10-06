import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Building2, Siren, LayoutDashboard, UserRound, LogOut } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';

type UserRole = 'GUEST' | 'HOST' | 'ADMIN' | 'LOCAL_PARTNER';

const navLinks = [
  { path: '/explore', label: 'Explore' },
  { path: '/explore', label: 'Stays', hidden: true },
  { path: '/emergency', label: 'Emergency Stay', urgent: true },
  { path: '/host', label: 'Become a Host' },
];

export const Navbar = () => {
  const { user, logout, hasRole, isLoading } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Solid background once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const dashboardLink = user
    ? hasRole(['HOST'])
      ? { to: '/host/dashboard', label: 'Host dashboard', icon: LayoutDashboard }
      : hasRole(['LOCAL_PARTNER'])
        ? { to: '/partner/dashboard', label: 'Partner dashboard', icon: LayoutDashboard }
        : { to: '/guest/dashboard', label: 'My trips', icon: LayoutDashboard }
    : null;

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors duration-200 ${
        scrolled || open ? 'border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80' : 'border-transparent bg-white'
      }`}
    >
      <nav className="container-gs flex h-16 items-center justify-between gap-4" aria-label="Main">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="GharStay home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-800 text-white">
            <Home className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-neutral-900">
            Ghar<span className="text-primary-600">Stay</span>
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks
            .filter((l) => !l.hidden)
            .map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  link.urgent
                    ? isActive(link.path)
                      ? 'bg-terracotta-50 text-terracotta-700'
                      : 'text-terracotta-600 hover:bg-terracotta-50'
                    : isActive(link.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
        </div>

        {/* Right actions */}
        <div className="hidden items-center gap-2 lg:flex">
          {isLoading ? (
            <div className="h-9 w-36 animate-pulse rounded-xl bg-neutral-100" />
          ) : user && dashboardLink ? (
            <>
              <Link
                to={dashboardLink.to}
                className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                <dashboardLink.icon className="h-4 w-4" aria-hidden="true" />
                {dashboardLink.label}
              </Link>
              <button
                onClick={logout}
                className="btn-ghost btn-sm"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost btn-sm">
                Log in
              </Link>
              <Link to="/register" className="btn-primary btn-sm">
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-neutral-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="animate-slide-down border-t border-neutral-200 bg-white lg:hidden">
          <div className="container-gs flex flex-col gap-1 py-4">
            {navLinks
              .filter((l) => !l.hidden)
              .map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? link.urgent
                        ? 'bg-terracotta-50 text-terracotta-700'
                        : 'bg-primary-50 text-primary-700'
                      : link.urgent
                        ? 'text-terracotta-600'
                        : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {link.urgent ? <Siren className="h-5 w-5" aria-hidden="true" /> : <Building2 className="h-5 w-5" aria-hidden="true" />}
                  {link.label}
                </Link>
              ))}

            <div className="my-2 h-px bg-neutral-200" />

            {isLoading ? null : user && dashboardLink ? (
              <>
                <Link
                  to={dashboardLink.to}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-100"
                >
                  <dashboardLink.icon className="h-5 w-5" aria-hidden="true" />
                  {dashboardLink.label}
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-100"
                >
                  <UserRound className="h-5 w-5" aria-hidden="true" />
                  Profile
                </Link>
                <button onClick={logout} className="btn-secondary mt-2 w-full">
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Log out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link to="/login" className="btn-secondary w-full">
                  Log in
                </Link>
                <Link to="/register" className="btn-primary w-full">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
