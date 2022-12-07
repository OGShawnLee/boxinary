export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean" || value instanceof Boolean;
}

export function isString(value: unknown): value is string {
  return typeof value === "string" || value instanceof String;
}
