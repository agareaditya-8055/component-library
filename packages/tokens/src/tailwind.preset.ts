import type { Config } from 'tailwindcss';
import {
  colors,
  spacing,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  radius,
  shadows
} from './index';

function toMutableObject<T extends Record<string, any>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => {
      if (Array.isArray(v)) return [k, [...v]];
      return [k, v];
    })
  );
}

function toStringValues(obj: Record<string, number>) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, String(v)])
  );
}

const preset = {
  theme: {
    colors,
    spacing,
    fontFamily: toMutableObject(fontFamily),
    fontSize: toMutableObject(fontSize),
    fontWeight: toStringValues(fontWeight),
    letterSpacing,
    borderRadius: radius,
    boxShadow: shadows,
    extend: {}
  }
} satisfies Partial<Config>;

export default preset;