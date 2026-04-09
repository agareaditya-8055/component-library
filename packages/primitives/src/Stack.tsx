import type { ReactElement } from 'react';
import type { FlexProps } from './Flex.js';
import { Flex } from './Flex.js';

type StackOwnProps = {
  direction?: 'vertical' | 'horizontal';
  gap?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
};

export type StackProps = Omit<FlexProps, 'direction' | 'gap' | 'align' | 'justify'> & StackOwnProps;

const directionClassNameMap: Record<NonNullable<StackOwnProps['direction']>, 'col' | 'row'> = {
  vertical: 'col',
  horizontal: 'row'
};

export function Stack(props: StackProps): ReactElement {
  const { direction = 'vertical', gap = '2', align, justify, ...restProps } = props;

  return (
    <Flex
      {...restProps}
      direction={directionClassNameMap[direction]}
      gap={gap}
      {...(align ? { align } : {})}
      {...(justify ? { justify } : {})}
    />
  );
}
