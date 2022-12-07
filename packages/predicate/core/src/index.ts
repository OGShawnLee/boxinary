export function isArray(value: unknown): value is Array<any>;

export function isArray<T>(
  value: unknown,
  predicate: (value: unknown) => value is T
): value is Array<T>;

export function isArray<T = any>(
  value: unknown,
  predicate?: (value: unknown) => value is T
): value is Array<T> {
  if (predicate) return Array.isArray(value) && value.every((val) => predicate(val));
  return Array.isArray(value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean" || value instanceof Boolean;
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number" || value instanceof Number;
}

export function isString(value: unknown): value is string {
  return typeof value === "string" || value instanceof String;
}