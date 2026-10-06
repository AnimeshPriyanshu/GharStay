import { HTMLAttributes, ReactNode, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hover = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={`${hover ? 'card-hover' : 'card'} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = 'Card';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading = ({ eyebrow, title, description, align = 'center', className = '' }: SectionHeadingProps) => (
  <div className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
    {eyebrow && <span className="eyebrow mb-3">{eyebrow}</span>}
    <h2 className="h2 text-balance">{title}</h2>
    {description && <p className="lead mt-3">{description}</p>}
  </div>
);

SectionHeading.displayName = 'SectionHeading';
