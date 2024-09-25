export function withoutProperty<O extends object, K extends keyof O>(
  obj: O,
  property: K
): Omit<O, K> {
  const { [property]: _, ...rest } = obj;
  return rest;
}

export function isObject(value: unknown) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
