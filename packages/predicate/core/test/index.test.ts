import { describe, it, expect } from "vitest";
import { isBoolean, isString } from "$lib";

describe("isBoolean", () => {
  it("Should return true with boolean values", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(new Boolean(false))).toBe(true);
    expect(isBoolean(new Boolean(true))).toBe(true);
  });

  it("Should return false with non-boolean values", () => {
    const values = [0, "string", null, undefined, {}, [], () => {}];
    for (const value of values) {
      expect(isBoolean(value)).toBe(false);
    }
  });
});

describe("isString", () => {
  it("Should return true with string values", () => {
    expect(isString("string")).toBe(true);
    expect(isString(new String("string"))).toBe(true);
  });

  it("Should return false with non-string values", () => {
    const values = [0, true, false, null, undefined, {}, [], () => {}];
    for (const value of values) {
      expect(isString(value)).toBe(false);
    }
  });
});
