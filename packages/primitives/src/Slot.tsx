import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode
} from 'react';

type SlotProps = HTMLAttributes<HTMLElement> & {
  children: ReactElement;
};

function mergeClassName(slotClassName: string | undefined, childClassName: string | undefined): string | undefined {
  if (!slotClassName && !childClassName) {
    return undefined;
  }

  return [slotClassName, childClassName].filter(Boolean).join(' ');
}

function composeEventHandlers<E>(
  childHandler: ((event: E) => void) | undefined,
  slotHandler: ((event: E) => void) | undefined
): ((event: E) => void) | undefined {
  if (!childHandler && !slotHandler) {
    return undefined;
  }

  return (event: E) => {
    childHandler?.(event);
    slotHandler?.(event);
  };
}

function mergeProps(slotProps: HTMLAttributes<HTMLElement>, childProps: Record<string, unknown>): Record<string, unknown> {
  const merged: Record<string, unknown> = {
    ...slotProps,
    ...childProps,
    className: mergeClassName(slotProps.className, childProps.className as string | undefined),
    style: {
      ...(slotProps.style ?? {}),
      ...(typeof childProps.style === 'object' && childProps.style ? childProps.style : {})
    }
  };

  if ('onClick' in slotProps || 'onClick' in childProps) {
    merged.onClick = composeEventHandlers(
      childProps.onClick as ((event: MouseEvent) => void) | undefined,
      slotProps.onClick as ((event: MouseEvent) => void) | undefined
    );
  }

  if ('onKeyDown' in slotProps || 'onKeyDown' in childProps) {
    merged.onKeyDown = composeEventHandlers(
      childProps.onKeyDown as ((event: KeyboardEvent) => void) | undefined,
      slotProps.onKeyDown as ((event: KeyboardEvent) => void) | undefined
    );
  }

  return merged;
}

export function Slot({ children, ...slotProps }: SlotProps): ReactElement {
  const child = Children.only(children) as ReactNode;

  if (!isValidElement(child)) {
    throw new Error('Slot expects a single valid React element child.');
  }

  const childProps = child.props as Record<string, unknown>;

  return cloneElement(child, mergeProps(slotProps, childProps));
}
