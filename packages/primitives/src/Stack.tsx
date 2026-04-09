import type { PrimitiveElement, PolymorphicComponentProps } from './types';
import { cx } from './cx';
import { Flex } from './Flex';

type StackOwnProps = {
  direction?: 'vertical' | 'horizontal';
  gap?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
};

export type StackProps<TAs extends PrimitiveElement = 'div'> = PolymorphicComponentProps<TAs, StackOwnProps>;

const directionClassNameMap: Record<NonNullable<StackOwnProps['direction']>, 'col' | 'row'> = {
  vertical: 'col',
  horizontal: 'row'
};

export function Stack<TAs extends PrimitiveElement = 'div'>(props: StackProps<TAs>): JSX.Element {
  const { direction = 'vertical', gap = '2', align, justify, className, ...restProps } = props;

  return (
    <Flex
      {...restProps}
      direction={directionClassNameMap[direction]}
      gap={gap}
      align={align}
      justify={justify}
      className={cx(className)}
    />
  );
}
