import type { Config } from 'tailwindcss';
import { colors, spacing, fontFamily, fontSize, fontWeight, letterSpacing, radius, shadows } from './packages/tokens/src';

const preset: Config = {
  theme: {
    colors,
    spacing,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    borderRadius: radius,
    boxShadow: shadows,
    extend: {}
  }
};

export default preset;
