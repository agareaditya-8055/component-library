type ClassPrimitive = string | number | boolean | null | undefined;
type ClassDictionary = Record<string, boolean | null | undefined>;
type ClassArray = ClassValue[];
export type ClassValue = ClassPrimitive | ClassDictionary | ClassArray;

function toClassName(value: ClassValue): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (!value || typeof value === 'boolean') {
    return '';
  }

  if (Array.isArray(value)) {
    return value.map(toClassName).filter(Boolean).join(' ');
  }

  return Object.entries(value)
    .filter(([, condition]) => Boolean(condition))
    .map(([className]) => className)
    .join(' ');
}

function getUtilityGroup(utility: string): string {
  const groups: Array<[RegExp, string]> = [
    [/^p[trblxy]?-/u, 'padding'],
    [/^m[trblxy]?-/u, 'margin'],
    [/^(w|min-w|max-w)-/u, 'width'],
    [/^(h|min-h|max-h)-/u, 'height'],
    [/^size-/u, 'size'],
    [/^bg-/u, 'background'],
    [/^text-/u, 'text'],
    [/^(font|tracking|leading)-/u, 'typography'],
    [/^rounded(?:-[trbl]{1,2})?-/u, 'radius'],
    [/^border(?:-[trblxy])?-/u, 'border'],
    [/^ring(?:-[trblxy])?-/u, 'ring'],
    [/^shadow/u, 'shadow'],
    [/^opacity-/u, 'opacity'],
    [/^gap[xy]?-/u, 'gap'],
    [/^justify-/u, 'justify'],
    [/^items-/u, 'items'],
    [/^inline-flex$|^flex$|^block$|^inline-block$|^hidden$/u, 'display'],
    [/^transition/u, 'transition'],
    [/^duration-/u, 'duration'],
    [/^ease-/u, 'ease'],
    [/^transform$/u, 'transform'],
    [/^(scale|translate|rotate|skew)-/u, 'transform-effect']
  ];

  const matched = groups.find(([pattern]) => pattern.test(utility));
  return matched ? matched[1] : utility;
}

function mergeTailwindLikeClasses(className: string): string {
  const tokens = className.trim().split(/\s+/u).filter(Boolean);
  const merged = new Map<string, string>();

  for (const token of tokens) {
    const important = token.startsWith('!') ? '!' : '';
    const cleanToken = important ? token.slice(1) : token;
    const segments = cleanToken.split(':');
    const utility = segments.pop() ?? cleanToken;
    const variants = segments.join(':');
    const key = `${important}${variants}|${getUtilityGroup(utility)}`;

    if (merged.has(key)) {
      merged.delete(key);
    }

    merged.set(key, token);
  }

  return Array.from(merged.values()).join(' ');
}

export function cn(...inputs: ClassValue[]): string {
  const joined = inputs.map(toClassName).filter(Boolean).join(' ').trim();

  if (!joined) {
    return '';
  }

  return mergeTailwindLikeClasses(joined);
}
