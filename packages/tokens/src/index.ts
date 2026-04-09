import { colors } from './colors';
import { radius } from './radius';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { fontFamily, fontSize, fontWeight, letterSpacing } from './typography';

export { colors } from './colors';
export { spacing } from './spacing';
export { fontFamily, fontSize, fontWeight, letterSpacing } from './typography';
export { radius } from './radius';
export { shadows } from './shadows';

export const tokens = {
  colors,
  spacing,
  typography: {
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing
  },
  radius,
  shadows
} as const;

export type Tokens = typeof tokens;
