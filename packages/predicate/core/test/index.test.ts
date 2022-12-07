import { describe, it, expect } from "vitest";
import { isString } from "$lib";

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
