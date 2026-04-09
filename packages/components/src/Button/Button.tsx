import {
  cloneElement,
  isValidElement,
  type KeyboardEvent,
  type JSX,
  type MouseEvent,
  type ReactElement
} from 'react';
import { Slot } from '@axiomui/primitives';
import { cn } from '@axiomui/utils';
import {
  buttonClassName,
  buttonContentClassName,
  buttonContentLoadingClassName,
  buttonIconClassName,
  buttonSpinnerClassName
} from './Button.styles.js';
import type { ButtonProps } from './Button.types.js';

function isTrulyDisabled(disabled: boolean | undefined, loading: boolean): boolean {
  return Boolean(disabled || loading);
}

function shouldRenderIcon(icon: ButtonProps['leftIcon'] | ButtonProps['rightIcon'], loading: boolean): boolean {
  return Boolean(icon && !loading);
}

export function Button(props: ButtonProps): JSX.Element {
  const {
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    asChild = false,
    className,
    children,
    loadingLabel = 'Loading',
    ...restProps
  } = props;

  const nativeDisabled = 'disabled' in restProps ? restProps.disabled : false;
  const isDisabled = isTrulyDisabled(nativeDisabled, loading);
  const hasOnlyIcon = size === 'icon';
  const Comp = asChild ? Slot : 'button';

  const interactiveProps = asChild
    ? {
        'data-disabled': isDisabled ? '' : undefined,
        'aria-disabled': isDisabled || undefined,
        onClick: (event: MouseEvent<HTMLElement>) => {
          if (isDisabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          if (typeof (restProps as { onClick?: (e: MouseEvent<HTMLElement>) => void }).onClick === 'function') {
            (restProps as { onClick: (e: MouseEvent<HTMLElement>) => void }).onClick(event);
          }
        },
        onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
          if (!isDisabled) {
            if (typeof (restProps as { onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void }).onKeyDown === 'function') {
              (restProps as { onKeyDown: (e: KeyboardEvent<HTMLElement>) => void }).onKeyDown(event);
            }
            return;
          }

          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.stopPropagation();
          }
        }
      }
    : {
        disabled: isDisabled,
        type: (restProps as { type?: 'button' | 'submit' | 'reset' }).type ?? 'button'
      };

  const content = (
    <>
      <span className={cn(buttonContentClassName, loading && buttonContentLoadingClassName)}>
        {shouldRenderIcon(leftIcon, loading) ? <span className={buttonIconClassName('left')}>{leftIcon}</span> : null}
        <span>{children}</span>
        {shouldRenderIcon(rightIcon, loading) ? <span className={buttonIconClassName('right')}>{rightIcon}</span> : null}
      </span>

      {loading ? (
        <span className={buttonSpinnerClassName} aria-hidden="true">
          <span />
        </span>
      ) : null}
      {loading ? <span className="sr-only">{loadingLabel}</span> : null}
    </>
  );

  const sharedProps = {
    className: cn(buttonClassName({ variant, size, loading, disabled: isDisabled, hasOnlyIcon }), className),
    'aria-busy': loading || undefined
  };

  if (asChild) {
    if (!isValidElement(children)) {
      throw new Error('Button with asChild expects a single React element child.');
    }

    return (
      <Comp {...sharedProps} {...(restProps as Record<string, unknown>)} {...interactiveProps}>
        {cloneElement(children as ReactElement, {
          children: content
        } as { children: JSX.Element })}
      </Comp>
    );
  }

  return (
    <Comp {...sharedProps} {...(restProps as Record<string, unknown>)} {...interactiveProps}>
      {content}
    </Comp>
  );
}
