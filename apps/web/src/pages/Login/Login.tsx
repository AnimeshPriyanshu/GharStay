import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Layout } from '../../components/layout';
import { Button, Input, Card } from '../../components/ui';
import { useAuth } from '../../lib/auth-context';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/guest/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
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
                <h1 className="mt-6 text-2xl font-bold text-neutral-900">Welcome back</h1>
                <p className="mt-1.5 text-sm text-neutral-500">Sign in to manage your stays and bookings</p>
              </div>

              {error && (
                <div className="mt-6 flex items-start gap-2 rounded-xl bg-terracotta-50 p-3.5 text-sm text-terracotta-700" role="alert">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <Input
                  id="login-email"
                  type="email"
                  label="Email address"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
                  autoComplete="email"
                  required
                  disabled={isLoading}
                />

                <div>
                  <label htmlFor="login-password" className="label">Password</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" aria-hidden="true">
                      <Lock className="h-4 w-4" />
                    </span>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password"
                      className="input pl-9 pr-10"
                      autoComplete="current-password"
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
                </div>

                <Button type="submit" size="lg" fullWidth loading={isLoading}>
                  Sign in
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-neutral-600">
                New to GharStay?{' '}
                <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700">
                  Create an account
                </Link>
              </p>
            </Card>

            <p className="mt-6 text-center text-xs text-neutral-400">
              A trusted place to stay, even when you don't know the city.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
