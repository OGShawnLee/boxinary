import { isAround, isArray, isBoolean, isFunction, isNumber, isObject, isString } from "$lib";

describe("isAround", () => {
  it("Should return true if the given number is around the given range", () => {
    expect(isAround(10, { min: -10, max: 20 })).toBe(true);
    expect(isAround(5, { min: -10, max: 20 })).toBe(true);
    expect(isAround(-5, { min: -10, max: 20 })).toBe(true);
    expect(isAround(-7.5, { min: -10, max: 20 })).toBe(true);
  });

  it("Should return false if the given number is not around the given range", () => {
    expect(isAround(30, { min: -10, max: 20 })).toBe(false);
    expect(isAround(100, { min: -10, max: 20 })).toBe(false);
    expect(isAround(-20, { min: -10, max: 20 })).toBe(false);
    expect(isAround(-50, { min: -10, max: 20 })).toBe(false);
  });

  describe("min", () => {
    it("Should be inclusive", () => {
      expect(isAround(-10, { min: -10, max: 20 })).toBe(true);
      expect(isAround(10, { min: 10, max: 20 })).toBe(true);
    });
  });

  describe("max", () => {
    it("Should be exclusive", () => {
      expect(isAround(20, { min: -10, max: 20 })).toBe(false);
      expect(isAround(-10, { min: -50, max: -10 })).toBe(false);
    });

    it("Should default to Infinity", () => {
      expect(isAround(-10, { min: -50 })).toBe(true);
      expect(isAround(0, { min: -10 })).toBe(true);
      expect(isAround(100, { min: -10 })).toBe(true);
      expect(isAround(100_000, { min: -10 })).toBe(true);
    });
  });
});

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

describe("isFunction", () => {
  it("Should return true with functions", () => {
    const values = [() => {}, async () => {}, function* () {}, new Function()];
    for (const value of values) {
      expect(isFunction(value)).toBe(true);
    }
  });

  it("Should return false with non-function values", () => {
    const values = [0, "First", false, true, new Promise<void>((res) => res()), {}, []];
    for (const value of values) {
      expect(isFunction(value)).toBe(false);
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

describe("isObject", () => {
  it("Should return true with objects", () => {
    const values = [[], {}, new Object({ name: "Smith" })];
    for (const value of values) {
      expect(isObject(value)).toBe(true);
    }
  });

  it("Should return false with non-object values", () => {
    const values = [0, false, true, () => 13, undefined, null, "string"];
    for (const value of values) {
      expect(isObject(value)).toBe(false);
    }
  });

  it("Should return false with null", () => {
    expect(isObject(null)).toBe(false);
  });

  describe("properties", () => {
    it("Should return true if the object has all the given properties", () => {
      const person = { name: "James", age: 43, country: "UK" };
      expect(isObject(person, ["name"])).toBe(true);
      expect(isObject(person, ["name", "age"])).toBe(true);
      expect(isObject(person, ["name", "age", "country"])).toBe(true);
    });

    it("Should return false if the object does not have all the given properties", () => {
      expect(isObject({}, ["name"])).toBe(false);
      expect(isObject({ age: 43 }, ["name", "age"])).toBe(false);
      expect(isObject({ age: 43, country: "uk" }, ["name", "age", "country"])).toBe(false);
    });
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
