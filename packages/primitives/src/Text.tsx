import type { PrimitiveElement, PolymorphicComponentProps } from './types';
import { cx } from './cx';

type TextOwnProps = {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  tone?: 'default' | 'muted' | 'brand' | 'success' | 'warning' | 'danger';
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
};

export type TextProps<TAs extends PrimitiveElement = 'span'> = PolymorphicComponentProps<TAs, TextOwnProps>;

const sizeClassNameMap: Record<NonNullable<TextOwnProps['size']>, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
};

const weightClassNameMap: Record<NonNullable<TextOwnProps['weight']>, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
};

const toneClassNameMap: Record<NonNullable<TextOwnProps['tone']>, string> = {
  default: 'text-gray-900',
  muted: 'text-gray-600',
  brand: 'text-brand-700',
  success: 'text-green-700',
  warning: 'text-amber-700',
  danger: 'text-red-700'
};

const alignClassNameMap: Record<NonNullable<TextOwnProps['align']>, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify'
};

export function Text<TAs extends PrimitiveElement = 'span'>(props: TextProps<TAs>): JSX.Element {
  const {
    as,
    size = 'base',
    weight = 'regular',
    tone = 'default',
    align,
    truncate = false,
    className,
    ...restProps
  } = props;

  const Comp = (as ?? 'span') as PrimitiveElement;

  return (
    <Comp
      className={cx(
        sizeClassNameMap[size],
        weightClassNameMap[weight],
        toneClassNameMap[tone],
        align ? alignClassNameMap[align] : undefined,
        truncate ? 'truncate' : undefined,
        className
      )}
      {...restProps}
    />
  );
}
