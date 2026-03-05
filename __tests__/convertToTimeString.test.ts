import convertISO8601ToTimeString from "@/utils/convertToTimeString";

describe("convertISO8601ToTimeString", () => {
  test("converts minutes only", () => {
    expect(convertISO8601ToTimeString("PT45M")).toBe("45 minutes");
  });

  test("converts hours only", () => {
    expect(convertISO8601ToTimeString("PT60M")).toBe("1 hour");
  });

  test("converts hours and minutes", () => {
    expect(convertISO8601ToTimeString("PT90M")).toBe("1 hour 30 minutes");
  });

  test("pluralizes hours correctly", () => {
    expect(convertISO8601ToTimeString("PT120M")).toBe("2 hours");
  });

  test("singular minute", () => {
    expect(convertISO8601ToTimeString("PT1M")).toBe("1 minute");
  });

  test("returns 'Invalid format' for bad input", () => {
    expect(convertISO8601ToTimeString("invalid")).toBe("Invalid format");
  });

  test("returns 'Invalid format' for empty string", () => {
    expect(convertISO8601ToTimeString("")).toBe("Invalid format");
  });

  test("handles PT0M", () => {
    expect(convertISO8601ToTimeString("PT0M")).toBe("");
  });

  test("handles large durations", () => {
    expect(convertISO8601ToTimeString("PT630M")).toBe("10 hours 30 minutes");
  });
});
