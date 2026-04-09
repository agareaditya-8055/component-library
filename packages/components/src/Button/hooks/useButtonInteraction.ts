import type { KeyboardEvent, MouseEvent } from 'react';

export function useButtonInteraction({
  disabled,
  loading,
  asChild,
  onClick,
  onKeyDown
}: {
  disabled?: boolean;
  loading?: boolean;
  asChild?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
}) {
  const isDisabled = Boolean(disabled || loading);

  if (!asChild) {
    return {
      disabled: isDisabled
    };
  }

  return {
    'data-disabled': isDisabled ? '' : undefined,
    'aria-disabled': isDisabled || undefined,
    onClick: (event: MouseEvent<HTMLElement>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    },
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (isDisabled && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onKeyDown?.(event);
    }
  };
}