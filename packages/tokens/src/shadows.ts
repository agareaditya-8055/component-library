export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.06), 0 1px 1px 0 rgb(0 0 0 / 0.04)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.12), 0 4px 6px -4px rgb(0 0 0 / 0.12)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.14), 0 8px 10px -6px rgb(0 0 0 / 0.14)',
  focusRing: '0 0 0 3px rgb(37 99 235 / 0.35)'
} as const;

export type ShadowTokens = typeof shadows;
