import { colors } from './colors.js';
import { radius } from './radius.js';
import { shadows } from './shadows.js';
import { spacing } from './spacing.js';
import { fontFamily, fontSize, fontWeight, letterSpacing } from './typography.js';

export { colors } from './colors.js';
export { spacing } from './spacing.js';
export { fontFamily, fontSize, fontWeight, letterSpacing } from './typography.js';
export { radius } from './radius.js';
export { shadows } from './shadows.js';

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
