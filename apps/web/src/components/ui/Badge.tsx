import { HTMLAttributes, ReactNode, forwardRef } from 'react';

type BadgeVariant = 'primary' | 'verified' | 'neutral' | 'terracotta' | 'amber' | 'outline';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-primary-50 text-primary-700',
  verified: 'bg-primary-50 text-primary-700',
  neutral: 'bg-neutral-100 text-neutral-600',
  terracotta: 'bg-terracotta-50 text-terracotta-700',
  amber: 'bg-amber-50 text-amber-700',
  outline: 'bg-white text-neutral-600 border border-neutral-200',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-[11px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`inline-flex max-w-full items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
