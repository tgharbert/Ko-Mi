import convertTime from "@/utils/convertInputTime";

describe("convertTime", () => {
  test("converts hours and minutes to ISO 8601 duration", () => {
    expect(convertTime("1", "30")).toBe("PT90M");
  });

  test("converts only hours", () => {
    expect(convertTime("2", "0")).toBe("PT120M");
  });

  test("converts only minutes", () => {
    expect(convertTime("0", "45")).toBe("PT45M");
  });

  test("handles empty strings as 0", () => {
    expect(convertTime("", "")).toBe("PT0M");
  });

  test("handles non-numeric strings as 0", () => {
    expect(convertTime("abc", "def")).toBe("PT0M");
  });

  test("handles large values", () => {
    expect(convertTime("10", "30")).toBe("PT630M");
  });

  test("handles zero hours and zero minutes", () => {
    expect(convertTime("0", "0")).toBe("PT0M");
  });
});
