import type { ReactElement } from 'react';
import type { BoxProps } from './Box.js';
import { Box } from './Box.js';
import { cx } from './cx.js';

type FlexOwnProps = {
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
  inline?: boolean;
};

export type FlexProps = Omit<BoxProps<'div'>, 'display'> & FlexOwnProps;

const directionClassNameMap: Record<NonNullable<FlexOwnProps['direction']>, string> = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  col: 'flex-col',
  'col-reverse': 'flex-col-reverse'
};

const alignClassNameMap: Record<NonNullable<FlexOwnProps['align']>, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch'
};

const justifyClassNameMap: Record<NonNullable<FlexOwnProps['justify']>, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly'
};

const wrapClassNameMap: Record<NonNullable<FlexOwnProps['wrap']>, string> = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse'
};

const gapClassNameMap: Record<NonNullable<FlexOwnProps['gap']>, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  6: 'gap-6',
  8: 'gap-8'
};

export function Flex(props: FlexProps): ReactElement {
  const { direction = 'row', align, justify, wrap, gap, inline = false, className, ...restProps } = props;

  return (
    <Box
      {...restProps}
      display={inline ? 'inline-flex' : 'flex'}
      className={cx(
        directionClassNameMap[direction],
        align ? alignClassNameMap[align] : undefined,
        justify ? justifyClassNameMap[justify] : undefined,
        wrap ? wrapClassNameMap[wrap] : undefined,
        gap ? gapClassNameMap[gap] : undefined,
        className
      )}
    />
  );
}
