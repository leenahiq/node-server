const {
  capitalise,
  capitaliseTitleOfPage,
} = require("../../src/utils/capitalise.js");

test("returns capitalise first letter of a word", () => {
  expect(capitalise("leenah")).toEqual("Leenah");
});

test("only capitalises the first word ", () => {
  expect(capitalise("two words")).toEqual("Two words");
});

test("returns capitalise first letter of a title of the page", () => {
  expect(capitaliseTitleOfPage("/news")).toEqual("News");
});

test("capitalise first letter of all the word in the title and join them with dash", () => {
  expect(capitaliseTitleOfPage("/news/pakistan")).toEqual("News - Pakistan");
});
