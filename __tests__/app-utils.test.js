const { isStringANumber } = require("../app-utils.js");

describe("isStringANumber", () => {
  test("400: Responds with the rejected promise where the input is not a number", async () => {
    const input = "abc";
    try {
      await isStringANumber(input);
    } catch (err) {
      expect(err).toEqual({ status: 400, message: "Invalid input" });
    }
  });
  test("400: Responds with the rejected promise where the input is not a number, but contains at least 1 digit", async () => {
    const input = "1abc1";
    try {
      await isStringANumber(input);
    } catch (err) {
      expect(err).toEqual({ status: 400, message: "Invalid input" });
    }
  });
  test("Does not return a rejected promise where the input is a string of digits", async () => {
    expect.assertions(1);
    const input = "121";
    try {
      await isStringANumber(input);
    } catch (err) {
      expect(err).toEqual({ status: 400, message: "Invalid input" });
    }
    expect(true).toBe(true);
  });
  test("Does not return a rejected promise where the input is a string of digits with a negative sign", async () => {
    expect.assertions(1);
    const input = "-121";
    try {
      await isStringANumber(input);
    } catch (err) {
      expect(err).toEqual({ status: 400, message: "Invalid input" });
    }
    expect(true).toBe(true);
  });
});
