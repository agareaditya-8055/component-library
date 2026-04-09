import type { ButtonSize, ButtonVariant } from './Button.types.js';

type ButtonClassOptions = {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  loading: boolean;
};

const baseClassName =
  'relative inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-600';

const variantClassNames: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  secondary: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
};

const sizeClassNames: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-5 text-base gap-2.5'
};

const disabledClassName = 'cursor-not-allowed opacity-50';

const loadingClassName = 'text-transparent';

export function buttonClassName(options: ButtonClassOptions): string {
  const classNames = [
    baseClassName,
    variantClassNames[options.variant],
    sizeClassNames[options.size],
    options.disabled || options.loading ? disabledClassName : '',
    options.loading ? loadingClassName : ''
  ];

  return classNames.filter(Boolean).join(' ');
}

export const spinnerClassName =
  'absolute inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent';
