import { describe, it, expect, vi } from "vitest";
import { isArray, isBoolean, isNumber, isString } from "$lib";

describe("isArray", () => {
  it("Should return true with arrays", () => {
    expect(isArray([])).toBe(true);
    expect(isArray(new Array())).toBe(true);
  });

  it("Should return false with non-array values", () => {
    const values = [{}, new Set(), new Map(), "string", 0, false, true];
    for (const value of values) {
      expect(isArray(value)).toBe(false);
    }
  });

  describe("predicate", () => {
    it("Should be used to determine whether all array values are of the given type or not", () => {
      const booleans = [true, false, true, false];
      const isBooleanArray = isArray(booleans, isBoolean);
      expect(isBooleanArray).toBe(true);

      const randomArray = ["One", "Two", 3, 4, 5];
      const isStringArray = isArray(randomArray, isString);
      expect(isStringArray).toBe(false);
    });

    it("Should pass the current value", () => {
      const numbers = [0, 1, 2, 3, 4, 5];
      const fn = vi.fn((val: unknown) => isNumber(val));
      isArray(numbers, fn as unknown as (val: unknown) => val is number);
      expect(fn).toBeCalledTimes(numbers.length);
      numbers.forEach((number) => {
        expect(fn).toBeCalledWith(number);
      });
    });

    it("Should stop execution after finding an invalid value", () => {
      const values = [0, 1, 2, "NAN", "Another One", "Yet-Another-One"];
      const fn = vi.fn((val: unknown) => isNumber(val));
      expect(isArray(values, fn as unknown as (val: unknown) => val is number)).toBe(false);
      expect(fn).toBeCalledTimes(4);
    });
  });
});

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

describe("isNumber", () => {
  it("Should return true with number values", () => {
    const values = [0, 0.125, new Number(400), new Number(400.25)];
    for (const value of values) {
      expect(isNumber(value)).toBe(true);
    }
  });

  it("Should return false with non-number values", () => {
    const values = [true, false, "string", null, undefined, {}, [], () => {}];
    for (const value of values) {
      expect(isNumber(value)).toBe(false);
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
