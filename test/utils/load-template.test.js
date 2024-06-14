const { loadTemplate } = require("../../src/utils/load-template.js");

it("returns updated template with correct content", () => {
  const ExampleProps = { content: "final page" };
  const result = loadTemplate("/mock-template", ExampleProps, "static");
  const expectedResult = "Mock Template: final page";

  expect(result.trim()).toEqual(expectedResult);
});

it("returns updated sub template with correct content", () => {
  const result = loadTemplate("/mock-template2", {}, "static");
  const expectedResult = "subnav";

  expect(result.trim()).toEqual(expectedResult);
});

it("return correct content if sub template is in sub folder", () => {
  const result = loadTemplate("/mock-template4", {}, "static");
  const expectedResult = "nested subnav";

  expect(result.trim()).toEqual(expectedResult);
});

it("return correct content if sub template name has number in it ", () => {
  const result = loadTemplate("/mock-template5", {}, "static");
  const expectedResult = "subnav3";

  expect(result.trim()).toEqual(expectedResult);
});

it("returns correct content for sub templates called in subtemplate ", () => {
  const ExampleProps = { content: "final page with" };
  const result = loadTemplate("/mock-template3", ExampleProps, "static");
  const expectedResult = "final page with subnav2 subnav3";

  expect(result.trim()).toEqual(expectedResult);
});
