const http = require("http");
const fs = require("fs");

const loadPage = (page) =>
  fs.readFileSync(`${__dirname}/pages${page}.html`, "utf8");

const capitilise = (word) => word.charAt(0).toUpperCase() + word.slice(1);
const capitiliseTitleOfPage = (service) =>
  service
    .split("/")
    .filter((item) => item)
    .map(capitilise)
    .join(" - ");

const getPage = (service, res) => {
  res.statusCode = 200;
  // create one file with template
  // inject content in it
  const template = loadPage("/template");
  const main = loadPage(service);
  const pageContent = template
    .replace("{{main}}", main)
    .replace("{{title}}", capitiliseTitleOfPage(service));
  res.end(pageContent);
  // res.end(fs.readFileSync(`${__dirname}/pages${service}.html`, "utf8"));
};

const isPageExist = (url) => {
  // look in pages folder if matching file exist
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
// ToDo
// Make sub menu to news
