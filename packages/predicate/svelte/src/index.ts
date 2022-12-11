import type { Readable, Writable } from "svelte/store";
import { isFunction, isInterface } from "@boxinary/predicate-core";

export function isStore(value: unknown): value is Readable<any> {
  return isInterface<Readable<any>>(value, {
    subscribe: isFunction,
  });
}

export function isWritable(value: unknown): value is Writable<any> {
  return isInterface<Writable<any>>(value, {
    subscribe: isFunction,
    set: isFunction,
    update: isFunction,
  });
}
