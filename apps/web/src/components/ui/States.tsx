import { ReactNode } from 'react';
import { SearchX, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({ icon, title, description, action, className = '' }: EmptyStateProps) => (
  <div className={`card flex flex-col items-center px-6 py-12 text-center ${className}`}>
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-500">
      {icon ?? <SearchX className="h-7 w-7" aria-hidden="true" />}
    </div>
    <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
    {description && <p className="mt-1.5 max-w-sm text-sm text-neutral-500">{description}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export const LoadingState = ({ label = 'Loading…', className = '' }: { label?: string; className?: string }) => (
  <div className={`flex items-center justify-center gap-3 py-12 text-sm text-neutral-500 ${className}`} role="status">
    <Loader2 className="h-5 w-5 animate-spin text-primary-500" aria-hidden="true" />
    {label}
  </div>
);

export const ErrorState = ({ title = 'Something went wrong', description, onRetry, className = '' }: { title?: string; description?: string; onRetry?: () => void; className?: string }) => (
  <div className={`card flex flex-col items-center px-6 py-12 text-center ${className}`} role="alert">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta-50 text-terracotta-500">
      <AlertTriangle className="h-7 w-7" aria-hidden="true" />
    </div>
    <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
    {description && <p className="mt-1.5 max-w-sm text-sm text-neutral-500">{description}</p>}
    {onRetry && (
      <Button variant="secondary" size="sm" className="mt-5" onClick={onRetry}>
        Try again
      </Button>
    )}
  </div>
);
