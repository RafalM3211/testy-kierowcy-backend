import type { Question } from "../types/globalTypes";

export function trimText(text: string, limit: number) {
  let returnedText = text;
  if (text.length > limit) {
    returnedText = text.slice(0, limit - 1) + "...";
  }
  return returnedText;
}

export function isJpgImage(media: Question["media"]) {
  const name = String(media);
  const extension = name.slice(name.lastIndexOf(".") + 1);
  return extension === "jpg";
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
