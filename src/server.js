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

const loadTemplate = (template, props = {}) => {
  let updatedTemplate = loadPage(template);

  for (const property in props) {
    updatedTemplate = updatedTemplate.replace(
      `{{${property}}}`,
      props[property]
    );
  }
  return updatedTemplate;
};

const getPage = (service, res) => {
  res.statusCode = 200;
  const main = loadTemplate(service, { date: "12-12-22" });

  const subNav = service.includes("news") ? loadTemplate("/nav") : "";

  const pageContent = loadTemplate("/template", {
    subNav,
    main,
    title: capitiliseTitleOfPage(service),
  });
  // console.log(3, pageContent);
  res.end(pageContent);
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
