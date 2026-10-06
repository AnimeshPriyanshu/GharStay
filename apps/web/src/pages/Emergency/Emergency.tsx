import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Lock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { Layout } from '../../components/layout';
import { Button, Card, Input, Select } from '../../components/ui';
import { EMERGENCY_REASONS } from '../../constants';

const steps = [
  {
    icon: MessageCircle,
    title: 'Tell us where you are',
    description: 'City, locality and what you need — nothing more for now.',
  },
  {
    icon: Car,
    title: 'A local partner is alerted',
    description: 'Trusted people nearby — auto drivers, shopkeepers — get your request.',
  },
  {
    icon: ShieldCheck,
    title: 'You get verified options',
    description: 'A call or WhatsApp with 2–3 verified places that can take you in.',
  },
];

export const EmergencyPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    city: '',
    locality: '',
    reason: '',
    guests: '1',
    nights: '1',
    phone: '',
    details: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.city.trim()) next.city = 'Please tell us the city you are in';
    if (!form.locality.trim()) next.locality = 'Please add the locality or a nearby landmark';
    if (!form.reason) next.reason = 'Please choose a reason';
    if (!form.phone.trim()) next.phone = 'We need a number to reach you';
    else if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(form.phone.replace(/[\s-]/g, ''))) {
      next.phone = 'Enter a valid 10-digit Indian mobile number';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200)); // demo submission
    setIsSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      {/* Header */}
      <header className="bg-cream-100">
        <div className="container-gs py-12 sm:py-14">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-terracotta-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta-700">
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              Urgent stay assistance
            </span>
            <h1 className="h1 mt-4 text-balance">Find a safe place nearby.</h1>
            <p className="lead mt-4">
              Stuck in a city you don't know? Tell us where you are and what you need — a real person from our local network will help you find a verified stay nearby.
            </p>
          </div>
        </div>
      </header>

      <div className="container-gs py-10 sm:py-12">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* FORM */}
          <div>
            {submitted ? (
              <Card className="p-8 text-center sm:p-10">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <h2 className="h3 mt-5">We're on it.</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
                  Local partners in <strong className="text-neutral-900">{form.city}</strong>
                  {form.locality && <> near <strong className="text-neutral-900">{form.locality}</strong></>} have been notified.
                  Expect a call or WhatsApp message within <strong className="text-neutral-900">2 hours</strong> with verified options.
                </p>
                <div className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3">
                  <div className="rounded-xl bg-neutral-50 p-4">
                    <Clock className="mx-auto h-5 w-5 text-primary-600" aria-hidden="true" />
                    <p className="mt-2 text-sm font-semibold text-neutral-900">Within 2 hours</p>
                    <p className="text-xs text-neutral-500">Typical response time</p>
                  </div>
                  <div className="rounded-xl bg-neutral-50 p-4">
                    <ShieldCheck className="mx-auto h-5 w-5 text-primary-600" aria-hidden="true" />
                    <p className="mt-2 text-sm font-semibold text-neutral-900">Verified only</p>
                    <p className="text-xs text-neutral-500">Every option is checked</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link to="/explore" className="btn-primary">Browse stays meanwhile</Link>
                  <Button variant="secondary" onClick={() => setSubmitted(false)}>Submit another request</Button>
                </div>
              </Card>
            ) : (
              <Card className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      id="em-city"
                      label="Current city"
                      placeholder="e.g. Kota"
                      value={form.city}
                      onChange={(e) => set('city', e.target.value)}
                      error={errors.city}
                      leftIcon={<MapPin className="h-4 w-4" aria-hidden="true" />}
                      requiredMark
                    />
                    <Input
                      id="em-locality"
                      label="Locality / landmark"
                      placeholder="e.g. near Talwandi"
                      value={form.locality}
                      onChange={(e) => set('locality', e.target.value)}
                      error={errors.locality}
                      leftIcon={<MapPin className="h-4 w-4" aria-hidden="true" />}
                      requiredMark
                    />
                  </div>

                  <Select
                    id="em-reason"
                    label="Reason"
                    placeholder="Select a reason"
                    value={form.reason}
                    onChange={(e) => set('reason', e.target.value)}
                    error={errors.reason}
                    options={[{ value: '', label: 'Select a reason' }, ...EMERGENCY_REASONS]}
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Select
                      id="em-guests"
                      label="Number of guests"
                      value={form.guests}
                      onChange={(e) => set('guests', e.target.value)}
                      options={Array.from({ length: 8 }, (_, i) => ({
                        value: String(i + 1),
                        label: `${i + 1} guest${i === 0 ? '' : 's'}`,
                      }))}
                    />
                    <Select
                      id="em-nights"
                      label="Number of nights"
                      value={form.nights}
                      onChange={(e) => set('nights', e.target.value)}
                      options={Array.from({ length: 7 }, (_, i) => ({
                        value: String(i + 1),
                        label: `${i + 1} night${i === 0 ? '' : 's'}`,
                      }))}
                    />
                  </div>

                  <Input
                    id="em-phone"
                    type="tel"
                    label="Contact number"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    error={errors.phone}
                    leftIcon={<Phone className="h-4 w-4" aria-hidden="true" />}
                    helperText="We'll reach out on call or WhatsApp — no marketing, ever."
                    requiredMark
                    autoComplete="tel"
                  />

                  <div>
                    <label htmlFor="em-details" className="label">
                      Anything else? <span className="font-normal text-neutral-400">(optional)</span>
                    </label>
                    <textarea
                      id="em-details"
                      rows={3}
                      value={form.details}
                      onChange={(e) => set('details', e.target.value)}
                      placeholder="Hospital name, train arrival time, number of bags…"
                      className="input min-h-[96px] resize-y"
                    />
                  </div>

                  <Button type="submit" variant="terracotta" size="lg" fullWidth loading={isSubmitting}>
                    Find nearby help
                  </Button>

                  <p className="flex items-center justify-center gap-1.5 text-center text-xs text-neutral-400">
                    <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                    Your details are shared only with the partners assisting you.
                  </p>
                </form>
              </Card>
            )}
          </div>

          {/* SIDE PANEL */}
          <aside className="space-y-5">
            <div className="rounded-2xl bg-primary-800 p-6 text-white">
              <h2 className="text-base font-semibold">Connecting you with trusted local assistance.</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                No forms lost in a queue. Your request goes to real people in the neighbourhood who know which homes are available right now.
              </p>
            </div>

            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={step.title} className="card flex gap-4 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta-50 text-terracotta-600">
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {i + 1}. {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Card className="bg-cream-100 p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                <ShieldCheck className="h-4 w-4 text-primary-600" aria-hidden="true" />
                Not an emergency service
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                For medical or police emergencies, call <strong>112</strong> first. GharStay helps you find a place to stay — safely and calmly.
              </p>
            </Card>
          </aside>
        </div>
      </div>
    </Layout>
  );
};
