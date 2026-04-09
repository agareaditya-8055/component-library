import { cn } from '@axiomui/utils';
import type { ButtonSize, ButtonVariant } from './Button.types.js';

type ButtonClassOptions = {
  variant: ButtonVariant;
  size: ButtonSize;
  loading: boolean;
  disabled: boolean;
  hasOnlyIcon: boolean;
};

const baseClassName =
  'relative inline-flex shrink-0 select-none items-center justify-center rounded-md font-medium outline-none transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none';

const variantClassNames: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-xs',
  secondary: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
  outline: 'bg-transparent text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
  ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
  destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-xs'
};

const sizeClassNames: Record<ButtonSize, string> = {
  xs: 'h-7 px-2.5 text-xs gap-1',
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-base gap-2',
  xl: 'h-12 px-6 text-base gap-2.5',
  icon: 'h-10 w-10 p-0'
};

const disabledClassName = 'cursor-not-allowed opacity-50';
const iconClassName = 'inline-flex shrink-0 items-center justify-center';

export const buttonContentClassName = 'inline-flex items-center justify-center';
export const buttonContentLoadingClassName = 'opacity-0';
export const buttonSpinnerClassName =
  'absolute inset-0 flex items-center justify-center pointer-events-none [&>span]:inline-block [&>span]:h-4 [&>span]:w-4 [&>span]:animate-spin [&>span]:rounded-full [&>span]:border-2 [&>span]:border-current [&>span]:border-r-transparent';

export function buttonClassName({ variant, size, loading, disabled, hasOnlyIcon }: ButtonClassOptions): string {
  return cn(
    baseClassName,
    variantClassNames[variant],
    sizeClassNames[size],
    (loading || disabled) && disabledClassName,
    hasOnlyIcon && 'aspect-square'
  );
}

export function buttonIconClassName(position: 'left' | 'right'): string {
  return cn(iconClassName, position === 'left' ? '-ml-0.5' : '-mr-0.5');
}
