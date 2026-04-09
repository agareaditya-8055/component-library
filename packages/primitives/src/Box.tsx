import type { PrimitiveElement, PolymorphicComponentProps } from './types';
import { cx } from './cx';

type BoxOwnProps = {
  display?: 'block' | 'inline-block' | 'inline' | 'flex' | 'inline-flex' | 'grid' | 'none';
};

export type BoxProps<TAs extends PrimitiveElement = 'div'> = PolymorphicComponentProps<TAs, BoxOwnProps>;

const displayClassNameMap: Record<NonNullable<BoxOwnProps['display']>, string> = {
  block: 'block',
  'inline-block': 'inline-block',
  inline: 'inline',
  flex: 'flex',
  'inline-flex': 'inline-flex',
  grid: 'grid',
  none: 'hidden'
};

export function Box<TAs extends PrimitiveElement = 'div'>(props: BoxProps<TAs>): JSX.Element {
  const { as, display, className, ...restProps } = props;
  const Comp = (as ?? 'div') as PrimitiveElement;

  return <Comp className={cx(display ? displayClassNameMap[display] : undefined, className)} {...restProps} />;
}
