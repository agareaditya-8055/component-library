import { cloneElement, isValidElement, type JSX, type ReactElement } from 'react';
import { Slot } from '@axiomui/primitives';
import { cn } from '@axiomui/utils';
import { buttonVariants, contentClass, contentLoading, iconClass, spinnerClass } from './Button.styles.js';
import type { ButtonProps } from './Button.types.js';
import { useButtonInteraction } from './hooks/useButtonInteraction.js';

export function Button(props: ButtonProps): JSX.Element {
  const {
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    iconPosition = 'left',
    iconOnly = false,
    fullWidth = false,
    asChild = false,
    className,
    children,
    loadingText = 'Loading',
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'button';

  const interactionProps = useButtonInteraction({
    disabled: 'disabled' in rest ? rest.disabled : false,
    loading,
    asChild,
    onClick: (rest as any).onClick,
    onKeyDown: (rest as any).onKeyDown
  });

  const content = (
    <>
      <span className={cn(contentClass, loading && contentLoading)}>
        {!loading && icon && iconPosition === 'left' && <span className={iconClass('left')}>{icon}</span>}
        {!iconOnly && <span>{children}</span>}
        {!loading && icon && iconPosition === 'right' && <span className={iconClass('right')}>{icon}</span>}
      </span>

      {loading && (
        <>
          <span className={spinnerClass} aria-hidden="true">
            <span />
          </span>
          <span className="sr-only">{loadingText}</span>
        </>
      )}
    </>
  );

  const variantProps = {
  variant,
  size,
  loading,
  fullWidth,
  iconOnly,
  ...(interactionProps.disabled !== undefined && {
    disabled: interactionProps.disabled
  })
};

  const sharedProps = {
    className: cn(buttonVariants(variantProps), className),
    'aria-busy': loading || undefined
  };

  if (asChild) {
    if (!isValidElement(children)) {
      throw new Error('Button with asChild expects a single React element child.');
    }

    return (
      <Comp {...sharedProps} {...rest} {...interactionProps}>
        {cloneElement(children as ReactElement, {
          children: content
        })}
      </Comp>
    );
  }

  return (
    <Comp {...sharedProps} {...rest} {...interactionProps}>
      {content}
    </Comp>
  );
}