const http = require("http");
const fs = require("fs");

const { capitaliseTitleOfPage } = require("./utils/capitalise.js");
const { loadTemplate } = require("./utils/load-template.js");

const getPage = (route, res) => {
  res.statusCode = 200;
  const main = loadTemplate(route, { date: "12-12-22" });
  const pageContent = loadTemplate("/template", {
    main,
    title: capitaliseTitleOfPage(route),
  });

  res.end(pageContent);
};

const isPageExist = (url) => {
  return fs.existsSync(`${__dirname}/pages${url}.html`);
};

const defaultPage = (req, res) => {
  const page = req.url === "/" ? "/index" : req.url;

  if (isPageExist(page)) {
    return getPage(page, res);
  }
  res.statusCode = 404;
  res.end("Not found");
};

const server = http.createServer(defaultPage);

module.exports = { server };
