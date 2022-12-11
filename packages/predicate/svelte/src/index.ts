import type { Readable } from "svelte/store";
import { isFunction, isInterface } from "@boxinary/predicate-core";

export function isStore(value: unknown): value is Readable<any> {
  return isInterface<Readable<any>>(value, {
    subscribe: isFunction,
  });
}
