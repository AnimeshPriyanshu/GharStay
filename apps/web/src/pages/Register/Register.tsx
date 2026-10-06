import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Mail, Lock, Eye, EyeOff, User, Phone, AlertCircle } from 'lucide-react';
import { Layout } from '../../components/layout';
import { Button, Card, Input, Select } from '../../components/ui';
import { useAuth } from '../../lib/auth-context';

type UserRoleType = 'GUEST' | 'HOST' | 'ADMIN' | 'LOCAL_PARTNER';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'GUEST',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const set = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.phone.trim()) next.phone = 'Phone number is required';
    else if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(form.phone.replace(/[\s-]/g, '')))
      next.phone = 'Enter a valid 10-digit Indian mobile number';
    if (!form.password) next.password = 'Password is required';
    else if (form.password.length < 8) next.password = 'At least 8 characters';
    if (form.password !== form.confirmPassword) next.confirmPassword = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setError('');
    setIsLoading(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role as UserRoleType,
      });
      navigate(form.role === 'HOST' ? '/host/dashboard' : '/guest/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout hideFooter>
      <div className="bg-cream-50">
        <div className="container-gs flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
          <div className="w-full max-w-md">
            <Card className="p-6 sm:p-8">
              <div className="text-center">
                <Link to="/" className="inline-flex items-center gap-2" aria-label="GharStay home">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-800 text-white">
                    <Home className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-xl font-bold tracking-tight text-neutral-900">
                    Ghar<span className="text-primary-600">Stay</span>
                  </span>
                </Link>
                <h1 className="mt-6 text-2xl font-bold text-neutral-900">Create your account</h1>
                <p className="mt-1.5 text-sm text-neutral-500">Book verified stays or open your home to guests</p>
              </div>

              {error && (
                <div className="mt-6 flex items-start gap-2 rounded-xl bg-terracotta-50 p-3.5 text-sm text-terracotta-700" role="alert">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <Input
                  id="reg-name"
                  label="Full name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  leftIcon={<User className="h-4 w-4" aria-hidden="true" />}
                  error={errors.name}
                  autoComplete="name"
                  required
                  disabled={isLoading}
                />
                <Input
                  id="reg-email"
                  type="email"
                  label="Email address"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  leftIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
                  error={errors.email}
                  autoComplete="email"
                  required
                  disabled={isLoading}
                />
                <Input
                  id="reg-phone"
                  type="tel"
                  label="Phone number"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  leftIcon={<Phone className="h-4 w-4" aria-hidden="true" />}
                  error={errors.phone}
                  autoComplete="tel"
                  required
                  disabled={isLoading}
                />

                <div className="relative">
                  <label htmlFor="reg-password" className="label">Password</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" aria-hidden="true">
                      <Lock className="h-4 w-4" />
                    </span>
                    <input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => set('password', e.target.value)}
                      placeholder="At least 8 characters"
                      className={`${errors.password ? 'input-error' : 'input'} pl-9 pr-10`}
                      autoComplete="new-password"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-600"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1.5 text-xs text-terracotta-600" role="alert">{errors.password}</p>}
                </div>

                <Input
                  id="reg-confirm"
                  type="password"
                  label="Confirm password"
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={(e) => set('confirmPassword', e.target.value)}
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                  required
                  disabled={isLoading}
                />

                <Select
                  id="reg-role"
                  label="I want to"
                  value={form.role}
                  onChange={(e) => set('role', e.target.value)}
                  options={[
                    { value: 'GUEST', label: 'Book stays as a guest' },
                    { value: 'HOST', label: 'List my property as a host' },
                    { value: 'LOCAL_PARTNER', label: 'Help travellers as a local partner' },
                  ]}
                  disabled={isLoading}
                />

                <p className="text-xs leading-relaxed text-neutral-400">
                  By creating an account you agree to our{' '}
                  <Link to="/host" className="underline hover:text-neutral-600">Terms</Link> and{' '}
                  <Link to="/host" className="underline hover:text-neutral-600">Privacy Policy</Link>.
                </p>

                <Button type="submit" size="lg" fullWidth loading={isLoading}>
                  Create account
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-neutral-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
                  Sign in
                </Link>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};
