import { cn } from '@axiomui/utils';
import type { ButtonSize, ButtonVariant } from './Button.types.js';

type ButtonVariantProps = {
  variant: ButtonVariant;
  size: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
};

const base =
  'relative inline-flex shrink-0 select-none items-center justify-center rounded-md font-medium outline-none transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none';

const variants = {
  variant: {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-xs',
    secondary: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
    outline: 'bg-transparent text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
    destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-xs'
  },
  size: {
    xs: 'h-7 px-2.5 text-xs gap-1',
    sm: 'h-8 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-11 px-5 text-base gap-2',
    xl: 'h-12 px-6 text-base gap-2.5'
  }
};

const states = {
  disabled: 'cursor-not-allowed opacity-50',
  fullWidth: 'w-full',
  iconOnly: 'aspect-square p-0'
};

export function buttonVariants({
  variant,
  size,
  loading,
  disabled,
  fullWidth,
  iconOnly
}: ButtonVariantProps) {
  return cn(
    base,
    variants.variant[variant],
    variants.size[size],
    (loading || disabled) && states.disabled,
    fullWidth && states.fullWidth,
    iconOnly && states.iconOnly
  );
}

// content styles
export const contentClass = 'inline-flex items-center justify-center';
export const contentLoading = 'opacity-0';

// spinner
export const spinnerClass =
  'absolute inset-0 flex items-center justify-center pointer-events-none [&>span]:inline-block [&>span]:h-4 [&>span]:w-4 [&>span]:animate-spin [&>span]:rounded-full [&>span]:border-2 [&>span]:border-current [&>span]:border-r-transparent';

// icon wrapper
export function iconClass(position: 'left' | 'right') {
  return cn('inline-flex shrink-0 items-center justify-center', position === 'left' ? '-ml-0.5' : '-mr-0.5');
}