import type { JSX } from 'react';
import { buttonClassName, spinnerClassName } from './Button.styles';
import type { ButtonProps } from './Button.types';

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  type = 'button',
  className,
  ...props
}: ButtonProps): JSX.Element {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={[buttonClassName({ variant, size, disabled, loading }), className].filter(Boolean).join(' ')}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? <span className={spinnerClassName} aria-hidden="true" /> : null}
      {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
      {loading ? <span className="sr-only">Loading</span> : null}
    </button>
  );
}
