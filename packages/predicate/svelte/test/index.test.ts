import { derived, readable, writable } from "svelte/store";
import { isStore, isWritable } from "$lib";

describe("isStore", () => {
  it("Should return true with a valid store (readable, derived and writable)", () => {
    const count = writable(10);
    const double = derived(count, (count) => count * 2);
    const read = readable(0, (set) => double.subscribe(set));
    expect(isStore(count)).toBe(true);
    expect(isStore(double)).toBe(true);
    expect(isStore(read)).toBe(true);
  });

  it("Should return true with custom stores", () => {
    const count = createCounter(10);
    expect(isStore(count)).toBe(true);
  });

  it("Should return false if the given value subscribe method is not a function or doesn't exist", () => {
    expect(isStore({ subscribe: 10 })).toBe(false);
    expect(isStore({})).toBe(false);
  });

  it("Should return false with anything else", () => {
    const values = [0, "0", {}, [], true, false, undefined, null];
    for (const value of values) expect(isStore(value)).toBe(false);
  });
});

describe("isWritable", () => {
  it("Should return true with writable stores", () => {
    const count = writable(10);
    expect(isWritable(count)).toBe(true);
  });

  it("Should work with custom stores", () => {
    const counter = createCounter(0);
    expect(isWritable(counter)).toBe(true);
  });

  it("Should return false with readable stores (derived or readable)", () => {
    const count = writable(10);
    const double = derived(count, (count) => count * 2);
    const read = readable(0, (set) => double.subscribe(set));
    expect(isWritable(count)).toBe(true);
    expect(isWritable(double)).toBe(false);
    expect(isWritable(read)).toBe(false);
  });

  it("Should return false if any store method is not a function", () => {
    const nonStore = { subscribe: () => {}, set: 10, update: "10" };
    expect(isWritable(nonStore)).toBe(false);
  });

  it("Shoul return false with anything else", () => {
    const values = [0, "0", {}, [], true, false, undefined, null];
    for (const value of values) expect(isWritable(value)).toBe(false);
  });
});

function createCounter(initialValue: number) {
  const count = writable(initialValue);
  return {
    ...count,
    increment() {
      count.update((count) => count + 1);
    },
  };
}
