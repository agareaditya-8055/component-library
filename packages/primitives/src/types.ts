import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

export type PrimitiveElement = ElementType;

export type AsProp<TAs extends PrimitiveElement> = {
  as?: TAs;
};

export type PropsToOmit<TAs extends PrimitiveElement, TProps> = keyof (AsProp<TAs> & TProps);

export type PolymorphicComponentProps<TAs extends PrimitiveElement, TProps = {}> = TProps &
  AsProp<TAs> & {
    className?: string;
    children?: ReactNode;
  } & Omit<ComponentPropsWithoutRef<TAs>, PropsToOmit<TAs, TProps>>;
