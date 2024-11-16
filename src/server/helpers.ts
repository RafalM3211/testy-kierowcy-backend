import path from "node:path";
import { fileURLToPath } from "url";

export function hasKey<T extends object, K extends PropertyKey>(
  obj: T,
  key: K
): obj is T & Record<K, any> {
  return key in obj;
}

export function addPropToObject<O extends string, V>(
  obj: any,
  key: O,
  value: V
) {
  obj[key] = value;
}

export function isDev() {
  return process.env.REACT_APP_NODE_ENV === "development";
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

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
