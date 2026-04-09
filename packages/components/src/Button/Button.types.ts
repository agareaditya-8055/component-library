import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> &
  ButtonOwnProps & {
    disabled?: boolean;
  };
