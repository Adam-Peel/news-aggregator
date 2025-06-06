const { convertTimestampToDate } = require("../db/seeds/utils");
const { getLookup } = require("../db/seeds/data-formatting");

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe("getLookup", () => {
  test("If passed empty object, returns error message", () => {
    const input = {};
    const actual = getLookup(input, "title", "article_id");
    const errMessage = "dataset is empty";
    expect(actual).toEqual(errMessage);
  });
  test("If passed an object with a rows array of length 1, returns expected object", () => {
    const input = { rows: [{ title: "Testing Testing", article_id: 123 }] };
    const actual = getLookup(input, "title", "article_id");
    const output = { "Testing Testing": 123 };
    expect(actual).toEqual(output);
  });
  test("If passed an object with a rows array of > length 1, returns expected object", () => {
    const input = {
      rows: [
        { title: "Testing Testing", article_id: 123 },
        { title: "Mambo no..", article_id: 5 },
      ],
    };
    const actual = getLookup(input, "title", "article_id");
    const output = { "Testing Testing": 123, "Mambo no..": 5 };
    expect(actual).toEqual(output);
  });
  test("Purity - input and output do not share same memory reference", () => {
    const input = {
      rows: [
        { title: "Testing Testing", article_id: 123 },
        { title: "Mambo no..", article_id: 5 },
      ],
    };
    getLookup(input, "title", "article_id");
    const output = { "Testing Testing": 123, "Mambo no..": 5 };
    expect(input).not.toBe(output);
  });
  test("Purity - input is not mutated", () => {
    const input = {
      rows: [
        { title: "Testing Testing", article_id: 123 },
        { title: "Mambo no..", article_id: 5 },
      ],
    };
    getLookup(input, "title", "article_id");
    const copyInput = {
      rows: [
        { title: "Testing Testing", article_id: 123 },
        { title: "Mambo no..", article_id: 5 },
      ],
    };
    expect(input).toEqual(copyInput);
  });
});

// Original array is unmutated
