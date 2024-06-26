const { loadTemplate } = require("../../src/utils/load-template.js");

let templatePath;
beforeEach(() => {
  templatePath = process.env.TEMPLATE_PATH;
  process.env.TEMPLATE_PATH = "static";
});

afterEach(() => {
  process.env.TEMPLATE_PATH = templatePath;
});

it("returns updated template with correct content", () => {
  const ExampleProps = { content: "final page" };
  const result = loadTemplate("/mock-template", ExampleProps);
  const expectedResult = "Mock Template: final page";

  expect(result.trim()).toEqual(expectedResult);
});

it("returns updated sub template with correct content", () => {
  const result = loadTemplate("/mock-template2");
  const expectedResult = "subnav";

  expect(result.trim()).toEqual(expectedResult);
});

it("return correct content if sub template is in sub folder", () => {
  const result = loadTemplate("/mock-template4");
  const expectedResult = "nested subnav";

  expect(result.trim()).toEqual(expectedResult);
});

it("return correct content if sub template name has number in it ", () => {
  const result = loadTemplate("/mock-template5");
  const expectedResult = "subnav3";

  expect(result.trim()).toEqual(expectedResult);
});

it("returns correct content for sub templates called in subtemplate ", () => {
  const ExampleProps = { content: "final page with" };
  const result = loadTemplate("/mock-template3", ExampleProps);
  const expectedResult = "final page with subnav2 subnav3";

  expect(result.trim()).toEqual(expectedResult);
});

it(" throw error if template doesn't exist", () => {
  process.env.TEMPLATE_PATH = "nothing";

  expect(() => loadTemplate("/mock-template3")).toThrow();
});
