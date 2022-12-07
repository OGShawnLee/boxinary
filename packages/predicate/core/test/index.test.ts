import * as core from "$lib";

describe("isAround", () => {
  const { isAround } = core;
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
  const { isArray, isBoolean, isNumber, isString } = core;
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
  const { isBoolean } = core;
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
  const { isFunction } = core;
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

describe("isInterface", () => {
  const { isArray, isBoolean, isFunction, isInterface, isNumber, isString } = core;

  interface User {
    name: string;
    displayName: string;
    createdAt: string;
    isVerified: boolean;
    children: number;
    friends: string[];
  }

  const user = {
    name: "Ergo",
    displayName: "Vincent Law",
    createdAt: "June 24 2123",
    isVerified: false,
    children: 0,
    friends: ["RE-L", "Pino", "Monad"],
  };

  function isUser(val: unknown): val is User {
    return isInterface<User>(val, {
      name: isString,
      displayName: isString,
      createdAt: isString,
      isVerified: isBoolean,
      children: isNumber,
      friends(val): val is Array<string> {
        return isArray(val, isString);
      },
    });
  }

  it("Should always return false with arrays", () => {
    expect(isUser([])).toBe(false);
    expect(isInterface([], {})).toBe(false);
  });

  it("Should handle values that are not objects", () => {
    expect(isUser(123)).toBe(false);
    expect(isUser("Invalid")).toBe(false);
    expect(isUser(false)).toBe(false);
    expect(isUser(true)).toBe(false);
    expect(isUser(null)).toBe(false);
    expect(isUser(undefined)).toBe(false);
  });

  it("Should return true if all the given predicates return true", () => {
    expect(isUser(user)).toBe(true);
  });

  it("Should return false if a predicate function returns false", () => {
    expect(
      isUser({
        name: "John",
        displayName: "Doe",
        createdAt: "24 May 1980",
        isVerified: "negative",
        children: 0,
        friends: ["John Cena", "John Snow", "John 117"],
      })
    ).toBe(false);
  });

  it("Should pass the object property value to the predicate function", () => {
    const { text, user_id } = {
      text: "You're kinda slow for a human, aren't ya?",
      user_id: 123339,
    };

    const tweet = { text, user_id };
    const textPredicate = vi.fn((value: unknown): value is string => isString(value));
    const idPredicate = vi.fn((value: unknown): value is number => isNumber(value));

    isInterface<{ text: string; user_id: number }>(tweet, {
      text(value): value is string {
        return textPredicate(value);
      },
      user_id(value): value is number {
        return idPredicate(value);
      },
    });

    expect(textPredicate).toBeCalledWith(text);
    expect(idPredicate).toBeCalledWith(user_id);
  });

  it("Should return false if a predicate property is missing", () => {
    const john = { name: "John", displayName: "117", isVerified: true, children: 0 };
    expect(
      isInterface<User>(john, {
        name: core.isString,
        displayName: core.isString,
        createdAt: core.isString,
        isVerified: core.isBoolean,
        children: core.isNumber,
        friends(val): val is Array<string> {
          return core.isArray(val, core.isString);
        },
      })
    ).toBe(false);
  });

  describe("Function Value", () => {
    interface WithFunction {
      name: string;
      fight: (foe: string) => boolean;
    }

    it("Should ask for a simple function predicate ((v) => v is Function)", () => {
      expect(
        isInterface<WithFunction>(
          { name: "James", fight: () => false },
          {
            name: isString,
            fight: isFunction,
          }
        )
      ).toBe(true);
    });
  });

  describe("Predicate Function Error", () => {
    it("Should throw a TypeError if not given a valid predicate function", () => {
      expect(() =>
        isInterface(user, {
          name: isString,
          displayName: isString,
          // @ts-expect-error
          createdAt: "Danger Levels",
          isVerified: isBoolean,
          children: isNumber,
        })
      ).toThrow(TypeError);
    });

    it("Should inform which property key was expecting it", () => {
      expect(() =>
        isInterface(user, {
          name: isString,
          displayName: isString,
          // @ts-expect-error
          createdAt: "Danger Levels",
          isVerified: isBoolean,
          children: isNumber,
        })
      ).toThrow(new TypeError("Expected Predicate Function for property: createdAt"));
    });
  });
});

describe("isNullish", () => {
  const { isNullish } = core;
  it("Should return true if value is nullish or undefined", () => {
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish(null)).toBe(true);
  });

  it("Should return false with anything else", () => {
    const values = [0, "string", false, true, "", {}, [], () => {}];
    for (const value of values) {
      expect(isNullish(value)).toBe(false);
    }
  });
});

describe("isNumber", () => {
  const { isNumber } = core;
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
  const { isObject } = core;
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
  const { isString } = core;
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
