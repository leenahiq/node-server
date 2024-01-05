const request = require("supertest");
const { server } = require("../src/server.js");
jest.setTimeout(500);

const testCases = [
  {
    page: "home",
    url: "/",
    content: "Hello World",
    title: "Index",
  },
  {
    page: "news",
    url: "/news",
    content: "News",
    title: "News",
  },
  {
    page: "sport",
    url: "/sport",
    content: "Sport",
    title: "Sport",
  },
  {
    page: "weather",
    url: "/weather",
    content: "Weather",
    title: "Weather",
  },
  {
    page: "News in Pakistan",
    url: "/news/pakistan",
    content: "News Pakistan",
    title: "News - Pakistan",
  },
];

describe.each(testCases)("$page page", ({ url, content, title }) => {
  test("returns 200 status", () => request(server).get(url).expect(200));

  test("returns correct content", () =>
    request(server)
      .get(url)
      .expect((res) => {
        expect(res.text).toMatch(content);
      }));

  test("returns correct title", () =>
    request(server)
      .get(url)
      .expect((res) => {
        expect(res.text).toMatch(`<title>${title}</title>`);
      }));
});

test("Invalid path returns 404 status", () =>
  request(server).get("/foo").expect(404));
