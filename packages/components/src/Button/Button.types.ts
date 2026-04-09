import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
  loadingText?: string;
  className?: string;
};

type ButtonAsChildProps = ButtonOwnProps & {
  asChild: true;
  children: ReactElement;
};

type ButtonAsNativeProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> &
  ButtonOwnProps & {
    asChild?: false;
    disabled?: boolean;
  };

export type ButtonProps = ButtonAsChildProps | ButtonAsNativeProps;