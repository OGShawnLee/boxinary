export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type Predicate<T> = (value: unknown) => value is T;

export function isAround(num: number, range: { min: number; max?: number }) {
  const { min, max = Infinity } = range;
  return num >= min && num < max;
}

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

export function isFunction(value: unknown): value is Function {
  return typeof value === "function" || value instanceof Function;
}

export function isInterface<T>(
  value: unknown,
  validation: {
    [P in keyof T]: T[P] extends Function ? Predicate<Function> : Predicate<T[P]>;
  }
) {
  if (isArray(value) || !isObject(value)) return false;
  for (const [key, predicate] of Object.entries(validation)) {
    if (!isFunction(predicate))
      throw new TypeError(`Expected Predicate Function for property: ${key}`);
    const hasKey = isObject(value, [key]);
    if (!hasKey) return false;
    if (!predicate(value[key])) return false;
  }
  return true;
}

export function isNullish(value: unknown): value is null | undefined {
  return value === null || typeof value === "undefined";
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number" || value instanceof Number;
}

export function isObject(val: unknown): val is object;

export function isObject<K extends PropertyKey>(
  val: unknown,
  properties: K[]
): val is Expand<Record<K, unknown>>;

export function isObject<K extends PropertyKey>(value: unknown, properties?: K[]) {
  const isObj = value !== null && typeof value === "object" && value instanceof Object;
  return properties ? isObj && properties.every((key) => key in value) : isObj;
}

export function isString(value: unknown): value is string {
  return typeof value === "string" || value instanceof String;
}

export function isWhitespace(value: string) {
  return value.replace(/\s+/g, "").length === 0;
}
